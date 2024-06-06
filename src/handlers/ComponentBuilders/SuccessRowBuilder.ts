import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import AbstractComponentBuilder from './AbstractComponentBuilder';

export default class SuccessRowBuilder extends AbstractComponentBuilder {
  rowCount = 0;
  row: ActionRowBuilder<ButtonBuilder>;
  private maxRows = 5;

  constructor() {
    super();
    this.row = new ActionRowBuilder<ButtonBuilder>();
  }

  addComponent(component: ButtonBuilder) {
    if (this.rowCount === this.maxRows) {
      throw new Error(
        `Maximum component count for this row reached (${this.maxRows})`
      );
    }
    this.rowCount += 1;
    this.row.addComponents(component);
  }

  createComponent(): ActionRowBuilder<ButtonBuilder> {
    return this.row;
  }
}
