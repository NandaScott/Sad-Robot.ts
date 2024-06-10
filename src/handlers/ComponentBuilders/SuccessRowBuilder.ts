import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import AbstractComponentBuilder from './AbstractComponentBuilder';

export default class SuccessRowBuilder extends AbstractComponentBuilder {
  componentCound = 0;
  row: ActionRowBuilder<ButtonBuilder>;
  private maxComponents = 5;

  constructor() {
    super();
    this.row = new ActionRowBuilder<ButtonBuilder>();
  }

  addComponent(component: ButtonBuilder) {
    if (this.componentCound === this.maxComponents) {
      throw new Error(
        `Maximum component count for this row reached (${this.maxComponents})`
      );
    }
    this.componentCound += 1;
    this.row.addComponents(component);
  }

  createComponent(): ActionRowBuilder<ButtonBuilder> {
    return this.row;
  }
}
