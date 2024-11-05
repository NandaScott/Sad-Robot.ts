import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import SuccessButtonBuilder from "../../builders/ComponentBuilders/SuccessButtonBuilder.js";
import chunkArray from "../../utils/chunk-array.js";
import SuccessRowBuilder from "../../builders/ComponentBuilders/SuccessRowBuilder.js";
export default class SuccessfulResponseBuilder {
  constructor(responses) {
    this.response = responses.successful;
    this.data = [];
    this.initialRows();
    this.buildChunks();
    this.buildRows();
  }
  isSingleDimensionArray(array) {
    return array.every(item => !Array.isArray(item));
  }
  isMultidimensionalArray(array) {
    return array.every(item => Array.isArray(item));
  }
  isActionRowBuilderArray(data) {
    return data.every(item => item instanceof ActionRowBuilder && item.components.every(component => component instanceof ButtonBuilder));
  }
  initialRows() {
    this.data = this.response.map(({
      scryfall
    }) => new SuccessButtonBuilder(scryfall.name, scryfall.id));
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
    this.data = this.data.map(chunk => {
      const row = new SuccessRowBuilder();
      chunk.forEach(builder => row.addComponent(builder.createComponent()));
      return row.createComponent();
    });
  }
  createSuccessRows() {
    if (!this.isActionRowBuilderArray(this.data)) {
      throw new Error();
    }
    return this.data;
  }
}