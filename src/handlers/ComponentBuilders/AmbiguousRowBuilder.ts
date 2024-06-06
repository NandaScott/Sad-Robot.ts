import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import AbstractComponentBuilder from './AbstractComponentBuilder';

export default class AmbiguousRowBuilder extends AbstractComponentBuilder {
  rowCount = 0;
  row: ActionRowBuilder<StringSelectMenuBuilder>;
  private maxRows = 1;

  constructor() {
    super();
    this.row = new ActionRowBuilder<StringSelectMenuBuilder>();
  }

  addComponent(component: StringSelectMenuBuilder) {
    if (this.rowCount === this.maxRows) {
      throw new Error(
        `Maximum component count for this row reached (${this.maxRows})`
      );
    }
    this.rowCount += 1;
    this.row.addComponents(component);
  }

  createComponent(): ActionRowBuilder<StringSelectMenuBuilder> {
    return this.row;
  }
}
