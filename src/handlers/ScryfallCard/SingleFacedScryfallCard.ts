import AbstractScryfallCard from './AbstractScryfallCard';
import { SingleFacedCard } from '../../types/ScryfallCardModel/ScryfallCardModel';
import { CustomScryfallConfig } from '../../../axios';
import ImageUriError from '../../errors/ImageUriError';

export default class SingleFacedScryfallCard implements AbstractScryfallCard {
  readonly data: SingleFacedCard;
  readonly ctx: CustomScryfallConfig['ctx'];

  constructor(data: SingleFacedCard, ctx: CustomScryfallConfig['ctx']) {
    this.data = data;
    this.ctx = ctx;
  }

  get image(): string {
    if (!this.data.image_uris) {
      throw new ImageUriError(
        `No images available for ${this.data.name}`,
        this.ctx
      );
    }
    if (!this.data.image_uris.normal) {
      throw new ImageUriError(
        `No normal images available for ${this.data.name}`,
        this.ctx
      );
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
