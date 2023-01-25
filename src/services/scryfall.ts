import Axios, { AxiosResponse } from 'axios';
import ScryfallCard from './scryfall-card';
import { Catalog, Rulings } from './scryfall-responses';

const scryfall = Axios.create({
  baseURL: 'https://api.scryfall.com',
  params: {}
});

scryfall.interceptors.request.use(
  (config) => {
    const startTime = new Date().getTime()
    config.params.timeData = { startTime };
    return config;
  },
  (error) => Promise.reject(error)
);

scryfall.interceptors.response.use((response) => {
  const endTime = new Date().getTime()
  const startTime = response.config.params.timeData.startTime
  const duration = endTime - startTime
  response.config.params.timeData.endTime = endTime
  response.config.params.timeData.duration = duration
  response.config.params.timeData.calc = parseFloat(((duration / 1000) % 60).toString())
  return response;
}, (error) => Promise.reject(error));

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

export async function getCardById(id: string): Promise<AxiosResponse<ScryfallCard>> {
  return scryfall.get(`/cards/${id}`)
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