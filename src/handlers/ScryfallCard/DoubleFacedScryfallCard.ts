import AbstractScryfallCard from "./AbstractScryfallCard";
import { MutliFacedCard } from "./ScryfallCardModel";

export default class DoubleFacedScryfallCard implements AbstractScryfallCard {
  readonly data: MutliFacedCard;

  constructor(data: MutliFacedCard) {
    this.data = data;
  }

  get image(): string {
    if (!this.data.card_faces) {
      throw new Error(`No card faces available for ${this.data.name}`);
    }
    if (!this.data.card_faces[0].image_uris.normal) {
      throw new Error(`No normal images available for ${this.data.name}`)
    }

    return this.data.card_faces[0].image_uris.normal;
  }

  get name(): string {
    return this.data.name;
  }

  get oracle(): string {
    if (!this.data.oracle_text) {
      throw new Error(`No oracle_text available for ${this.data.name}`);
    }
    return this.data.oracle_text;
  }

  get uri(): string {
    return this.data.scryfall_uri;
  }
}