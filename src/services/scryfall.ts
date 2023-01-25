import Axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { stripProps } from './request-transformers';
import ScryfallCard from './scryfall-card';
import { Catalog, Rulings } from './scryfall-responses';

const addStartTime = (config: InternalAxiosRequestConfig<any>) => {
  const startTime = new Date().getTime()
  config.params.timeData = { startTime };
  return config;
}

const addTimeData = (response: AxiosResponse) => {
  const endTime = new Date().getTime()
  const startTime = response.config.params.timeData.startTime
  const duration = endTime - startTime
  response.config.params.timeData.endTime = endTime
  response.config.params.timeData.duration = duration
  response.config.params.timeData.calc = parseFloat(((duration / 1000) % 60).toString())
  return response;
}

const handleError = (error: any) => Promise.reject(error)

const scryfall = Axios.create({
  baseURL: 'https://api.scryfall.com',
  params: {}
});

scryfall.interceptors.request.use(addStartTime, handleError);
scryfall.interceptors.response.use(addTimeData, handleError);

const strippedScryfall = Axios.create({
  baseURL: 'https://api.scryfall.com',
  params: {},
  transformResponse: [
    stripProps
  ]
});

strippedScryfall.interceptors.request.use(addStartTime, handleError);
strippedScryfall.interceptors.response.use(addTimeData, handleError);

type MinimumProps = 'id' | 'name' | 'scryfall_uri' | 'layout' | 'image_uris'

export type NormalizedCard = Pick<ScryfallCard, MinimumProps>

export async function getCardByName(name: string, set?: string): Promise<AxiosResponse<ScryfallCard>> {
  const params = {
    fuzzy: name,
    set
  }
  return scryfall.get('/cards/named', { params })
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

export async function getCardNameCatalog(): Promise<AxiosResponse<Catalog>> {
  return scryfall.get('/catalog/card-names')
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export async function getCardAutocomplete(cardName: string): Promise<AxiosResponse<Catalog>> {
  return scryfall.get('/cards/autocomplete', { params: { q: cardName, include_extras: true } })
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

export async function getCardByCodeNumber(code: string, number: number): Promise<AxiosResponse<ScryfallCard>> {
  return scryfall.get(`/cards/${code}/${number}/en`)
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

export async function getCardById(id: string): Promise<AxiosResponse<NormalizedCard[]>> {
  return strippedScryfall.get(`/cards/${id}`)
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

export async function getRandom(): Promise<AxiosResponse<ScryfallCard>> {
  return scryfall.get('/cards/random')
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

export async function getRulings(cardId: string): Promise<AxiosResponse<Rulings>> {
  return scryfall.get(`/cards/${cardId}/rulings`)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};