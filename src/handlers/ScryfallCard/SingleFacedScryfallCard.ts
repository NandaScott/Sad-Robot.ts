import AbstractScryfallCard from './AbstractScryfallCard';
import { SingleFacedCard } from './ScryfallCardModel';

export default class SingleFacedScryfallCard implements AbstractScryfallCard {
  readonly data: SingleFacedCard;

  constructor(data: SingleFacedCard) {
    this.data = data;
  }

  get image(): string {
    if (!this.data.image_uris) {
      throw new Error(`No images available for ${this.data.name}`);
    }
    if (!this.data.image_uris.normal) {
      throw new Error(`No normal images available for ${this.data.name}`);
    }

    return this.data.image_uris.normal;
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
