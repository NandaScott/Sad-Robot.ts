import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { CustomResponseData } from '../../../axios';
import ScryfallCardModel from '../../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../../types/ScryfallResponseError/ScryfallResponseError';
import DropDownBuilder from '../../builders/ComponentBuilders/DropDownBuilder';
import AmbiguousRowBuilder from '../../builders/ComponentBuilders/AmbiguousRowBuilder';

export default class AmbiguousResponseBuilder {
  response: CustomResponseData<ScryfallResponseError>[];
  data:
    | ScryfallResponseError[]
    | DropDownBuilder[]
    | ActionRowBuilder<StringSelectMenuBuilder>[];

  constructor(responses: {
    successful: CustomResponseData<ScryfallCardModel>[];
    failed: CustomResponseData<ScryfallResponseError>[];
  }) {
    this.response = responses.failed;
    this.data = [];
    this.initialRows();
    this.buildDropDownRows();
    this.buildActionRows();
  }

  private isScryfallResponseErrorArray(
    data: typeof this.data
  ): data is ScryfallResponseError[] {
    return data.every((item) => 'object' in item && item.object === 'error');
  }

  private isDropDownBuilderArray(
    data: typeof this.data
  ): data is DropDownBuilder[] {
    return data.every((item) => item instanceof DropDownBuilder);
  }

  private isActionRowBuilderArray(
    data: typeof this.data
  ): data is ActionRowBuilder<StringSelectMenuBuilder>[] {
    return data.every(
      (item) =>
        item instanceof ActionRowBuilder &&
        item.components.every(
          (component) => component instanceof StringSelectMenuBuilder
        )
    );
  }

  initialRows() {
    this.data = this.response
      .filter(({ scryfall }) => scryfall.type === 'ambiguous')
      .map(({ scryfall }) => {
        const keyword = scryfall.details.match(/“(.*)”/gm);
        scryfall.details = `Options for ${keyword}`;
        return scryfall;
      });
  }

  buildDropDownRows() {
    if (!this.isScryfallResponseErrorArray(this.data)) {
      throw new Error();
    }

    this.data = this.data.map(
      ({ details, autocomplete }) =>
        new DropDownBuilder(details, autocomplete ?? [])
    );
  }

  buildActionRows() {
    if (!this.isDropDownBuilderArray(this.data)) {
      throw new Error();
    }

    this.data = this.data.map((builder) => {
      const row = new AmbiguousRowBuilder();
      row.addComponent(builder.createComponent());
      return row.createComponent();
    });
  }

  createAmbiguousRows(): ActionRowBuilder<StringSelectMenuBuilder>[] {
    if (!this.isActionRowBuilderArray(this.data)) {
      throw new Error();
    }

    return this.data;
  }
}
