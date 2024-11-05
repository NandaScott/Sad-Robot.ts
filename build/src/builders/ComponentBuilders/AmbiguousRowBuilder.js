import { ActionRowBuilder } from 'discord.js';
import AbstractComponentBuilder from "./AbstractComponentBuilder.js";
export default class AmbiguousRowBuilder extends AbstractComponentBuilder {
  rowCount = 0;
  maxRows = 1;
  constructor() {
    super();
    this.row = new ActionRowBuilder();
  }
  addComponent(component) {
    if (this.rowCount === this.maxRows) {
      throw new Error(`Maximum component count for this row reached (${this.maxRows})`);
    }
    this.rowCount += 1;
    this.row.addComponents(component);
  }
  createComponent() {
    return this.row;
  }
}