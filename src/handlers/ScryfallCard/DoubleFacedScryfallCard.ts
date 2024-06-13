import AbstractScryfallCard from './AbstractScryfallCard';
import { MutliFacedCard } from '../../types/ScryfallCardModel/ScryfallCardModel';
import ImageUriError from '../../errors/ImageUriError';
import OracleNotFound from '../../errors/OracleNotFound';
import { Interaction, Message } from 'discord.js';

export default class DoubleFacedScryfallCard implements AbstractScryfallCard {
  readonly data: MutliFacedCard;
  readonly ctx: Message | Interaction;

  constructor(data: MutliFacedCard, ctx: Message | Interaction) {
    this.data = data;
    this.ctx = ctx;
  }

  get frontFace(): string {
    if (!this.data.card_faces) {
      throw new ImageUriError(
        `No card faces available for ${this.data.name}`,
        this.ctx
      );
    }
    if (!this.data.card_faces[0].image_uris.normal) {
      throw new ImageUriError(
        `No normal images available for ${this.data.name}`,
        this.ctx
      );
    }

    return this.data.card_faces[0].image_uris.normal;
  }

  get backFace(): string {
    if (!this.data.card_faces) {
      throw new ImageUriError(
        `No card faces available for ${this.data.name}`,
        this.ctx
      );
    }
    if (!this.data.card_faces[1].image_uris.normal) {
      throw new ImageUriError(
        `No normal images available for ${this.data.name}`,
        this.ctx
      );
    }

    return this.data.card_faces[1].image_uris.normal;
  }

  get name(): string {
    return this.data.name;
  }

  get oracle(): string {
    if (!this.data.oracle_text) {
      throw new OracleNotFound(
        `No oracle_text available for ${this.data.name}`,
        this.ctx
      );
    }
    return this.data.oracle_text;
  }

  get uri(): string {
    return this.data.scryfall_uri;
  }
}
