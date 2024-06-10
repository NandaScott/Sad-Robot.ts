import { APIEmbed } from 'discord.js';
import { CustomResponseData } from '../../../axios';
import ScryfallCardModel from '../../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../../types/ScryfallResponseError/ScryfallResponseError';
import CardErrorBuilder from '../../builders/EmbedBuilders/CardErrorBuilder';

export default class ErrorsResponseBuilder {
  response: CustomResponseData<ScryfallResponseError>[];
  data: ScryfallResponseError[];

  constructor(responses: {
    successful: CustomResponseData<ScryfallCardModel>[];
    failed: CustomResponseData<ScryfallResponseError>[];
  }) {
    this.response = responses.failed;
    this.data = [];
    this.initialRows();
  }

  initialRows() {
    this.data = this.response
      .filter(
        ({ scryfall }) =>
          scryfall.code === 'not_found' && scryfall.type !== 'ambiguous'
      )
      .map(({ scryfall }) => scryfall);
  }

  createEmbeds(): APIEmbed[] {
    return this.data.map(({ details }) => {
      const errorEmbed = new CardErrorBuilder(details);
      return errorEmbed.create();
    });
  }
}
