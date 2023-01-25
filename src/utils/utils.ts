import { AxiosResponse } from "axios";
import { getCardByName } from "../services/scryfall";
import ScryfallCard from "../services/scryfall-card";

const cardDeclarationRegExp = new RegExp(/(\[\[[\w\s\'\.\,|/:🎲-]+\]\])+/g)

export function isCardDeclaration(message: string): boolean {
  const cardsFound = message.match(cardDeclarationRegExp);
  if (cardsFound !== null && cardsFound.length === 0) return false;
  return true;
}

export function getCardDeclarations(message: string): string[] {
  const matches = message.match(cardDeclarationRegExp)
  if (matches === null) return [];
  return matches
}

export function scrubDeclarationSyntax(declarations: string[]) {
  return declarations.map((card) => card.replace('[[', '').replace(']]', ''))
}

export function fetchAllCards(cards: string[]) {
  return cards.map((name) => getCardByName(name))
}

export async function resolveScryfallResp(resp: Promise<AxiosResponse<ScryfallCard, any>>[]):
  Promise<ScryfallCard[]> {
  return new Promise((res, rej) => Promise.all(resp)
    .then((cards) => res(cards.map((card) => card.data)))
    .catch((err) => { console.error(err); rej(err) }))
}