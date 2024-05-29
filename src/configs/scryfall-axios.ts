import axios, { CreateAxiosDefaults } from 'axios';
import ScryfallCardModel from '../handlers/ScryfallCard/ScryfallCardModel';
import delay from '../utils/delay';
import ScryfallError from '../types/ScryfallError/ScryfallError';
import { CustomScryfallConfig } from '../../axios';

export interface ScryfallAxiosError extends Error {
  scryfall: ScryfallError;
  responseTime: number;
  name: 'ScryfallError';
  loggingError: string;
  ctx: CustomScryfallConfig['ctx'];
}

const scryfallConfig: CreateAxiosDefaults<ScryfallCardModel> = {
  baseURL: 'https://api.scryfall.com',
  transformResponse: [
    (data) => JSON.parse(data),
    (data) => ({
      scryfall: data,
      responseTime: data.responseTime,
    }),
  ],
};

const scryfall = axios.create(scryfallConfig);

const RATE_LIMIT_INTERVAL = 100; // ms between requests
// Shared delay promise to enforce the delay
let lastRequestTime = 0;

scryfall.interceptors.request.use(async (config) => {
  const currentTime = Date.now();
  const timeSinceLastRequest = currentTime - lastRequestTime;

  if (timeSinceLastRequest < RATE_LIMIT_INTERVAL) {
    await delay(RATE_LIMIT_INTERVAL - timeSinceLastRequest);
  }

  lastRequestTime = Date.now();

  // Can log data here for debugging

  return config;
});

scryfall.interceptors.response.use(
  (resp) => {
    const now = new Date();
    const last = new Date(lastRequestTime);
    const seconds = (now.getTime() - last.getTime()) / 1000;
    resp.data.responseTime = seconds;
    return resp;
  },
  (error) => {
    const {
      stack,
      config: { ctx },
    } = error;
    const { data } = error.response;
    const now = new Date();
    const last = new Date(lastRequestTime);
    const seconds = (now.getTime() - last.getTime()) / 1000;
    const responseTime = seconds;
    const name =
      error.response.data.scryfall.object === 'error'
        ? 'ScryfallError'
        : error.name;
    const loggingError = `${error.response.data.scryfall.status}: ${error.response.data.scryfall.details}`;

    const rejection: ScryfallAxiosError = {
      stack,
      name,
      responseTime,
      loggingError,
      ctx,
      scryfall: data.scryfall,
      message: loggingError,
    };

    Promise.reject(rejection);
  }
);

export default scryfall;
