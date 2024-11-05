import { ActionRowBuilder } from 'discord.js';
import AbstractComponentBuilder from "./AbstractComponentBuilder.js";
export default class SuccessRowBuilder extends AbstractComponentBuilder {
  componentCound = 0;
  maxComponents = 5;
  constructor() {
    super();
    this.row = new ActionRowBuilder();
  }
  addComponent(component) {
    if (this.componentCound === this.maxComponents) {
      throw new Error(`Maximum component count for this row reached (${this.maxComponents})`);
    }
    this.componentCound += 1;
    this.row.addComponents(component);
  }
  createComponent() {
    return this.row;
  }
}