import axios, { CreateAxiosDefaults } from 'axios';
import ScryfallCardModel from '../types/ScryfallCardModel/ScryfallCardModel';
import delay from '../utils/delay';

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

function getSecondsFromLastRequest() {
  const now = new Date();
  const last = new Date(lastRequestTime);
  const seconds = (now.getTime() - last.getTime()) / 1000;
  return seconds;
}

scryfall.interceptors.response.use(
  (resp) => {
    resp.data.responseTime = getSecondsFromLastRequest();
    return resp;
  },
  (error) => {
    error.response.data.responseTime = getSecondsFromLastRequest();
    throw error;
  }
);

export default scryfall;
