import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import DropDownBuilder from "../../builders/ComponentBuilders/DropDownBuilder.js";
import AmbiguousRowBuilder from "../../builders/ComponentBuilders/AmbiguousRowBuilder.js";
export default class AmbiguousResponseBuilder {
  constructor(responses) {
    this.response = responses.failed;
    this.data = [];
    this.initialRows();
    this.buildDropDownRows();
    this.buildActionRows();
  }
  isScryfallResponseErrorArray(data) {
    return data.every(item => 'object' in item && item.object === 'error');
  }
  isDropDownBuilderArray(data) {
    return data.every(item => item instanceof DropDownBuilder);
  }
  isActionRowBuilderArray(data) {
    return data.every(item => item instanceof ActionRowBuilder && item.components.every(component => component instanceof StringSelectMenuBuilder));
  }
  initialRows() {
    this.data = this.response.filter(({
      scryfall
    }) => scryfall.type === 'ambiguous').map(({
      scryfall
    }) => {
      const keyword = scryfall.details.match(/“(.*)”/gm);
      scryfall.details = `Options for ${keyword}`;
      return scryfall;
    });
  }
  buildDropDownRows() {
    if (!this.isScryfallResponseErrorArray(this.data)) {
      throw new Error();
    }
    this.data = this.data.map(({
      details,
      autocomplete
    }) => new DropDownBuilder(details, autocomplete ?? []));
  }
  buildActionRows() {
    if (!this.isDropDownBuilderArray(this.data)) {
      throw new Error();
    }
    this.data = this.data.map(builder => {
      const row = new AmbiguousRowBuilder();
      row.addComponent(builder.createComponent());
      return row.createComponent();
    });
  }
  createAmbiguousRows() {
    if (!this.isActionRowBuilderArray(this.data)) {
      throw new Error();
    }
    return this.data;
  }
}