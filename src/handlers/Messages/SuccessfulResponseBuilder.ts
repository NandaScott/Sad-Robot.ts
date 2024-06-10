import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { CustomResponseData } from '../../../axios';
import ScryfallCardModel from '../../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../../types/ScryfallResponseError/ScryfallResponseError';
import SuccessButtonBuilder from '../../builders/ComponentBuilders/SuccessButtonBuilder';
import chunkArray from '../../utils/chunk-array';
import SuccessRowBuilder from '../../builders/ComponentBuilders/SuccessRowBuilder';

export default class SuccessfulResponseBuilder {
  response: CustomResponseData<ScryfallCardModel>[];
  data:
    | SuccessButtonBuilder[]
    | SuccessButtonBuilder[][]
    | ActionRowBuilder<ButtonBuilder>[];

  constructor(responses: {
    successful: CustomResponseData<ScryfallCardModel>[];
    failed: CustomResponseData<ScryfallResponseError>[];
  }) {
    this.response = responses.successful;
    this.data = [];
    this.initialRows();
    this.buildChunks();
    this.buildRows();
  }

  private isSingleDimensionArray(
    array: typeof this.data
  ): array is SuccessButtonBuilder[] {
    return array.every((item) => !Array.isArray(item));
  }

  private isMultidimensionalArray(
    array: typeof this.data
  ): array is SuccessButtonBuilder[][] {
    return array.every((item) => Array.isArray(item));
  }

  private isActionRowBuilderArray(
    data: typeof this.data
  ): data is ActionRowBuilder<ButtonBuilder>[] {
    return data.every(
      (item) =>
        item instanceof ActionRowBuilder &&
        item.components.every((component) => component instanceof ButtonBuilder)
    );
  }

  initialRows() {
    this.data = this.response.map(
      ({ scryfall }) => new SuccessButtonBuilder(scryfall.name, scryfall.id)
    );
  }

  buildChunks() {
    if (!this.isSingleDimensionArray(this.data)) {
      throw new Error();
    }

    this.data = chunkArray(this.data, 4);
  }

  buildRows() {
    if (!this.isMultidimensionalArray(this.data)) {
      throw new Error();
    }

    this.data = this.data.map((chunk) => {
      const row = new SuccessRowBuilder();
      chunk.forEach((builder) => row.addComponent(builder.createComponent()));
      return row.createComponent();
    });
  }

  createSuccessRows(): ActionRowBuilder<ButtonBuilder>[] {
    if (!this.isActionRowBuilderArray(this.data)) {
      throw new Error();
    }

    return this.data;
  }
}
