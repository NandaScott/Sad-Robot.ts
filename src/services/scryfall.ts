import Axios, { AxiosResponse } from 'axios';
import ScryfallCard from './scryfall-card';
import { Catalog, Rulings } from './scryfall-responses';

const scryfall = Axios.create({
  baseURL: 'https://api.scryfall.com'
});

export async function getCardByName(name: string, set: string): Promise<AxiosResponse<ScryfallCard>> {
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