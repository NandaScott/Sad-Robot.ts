import { ButtonBuilder, ButtonStyle } from 'discord.js';
import AbstractComponentBuilder from "./AbstractComponentBuilder.js";
export default class SuccessButtonBuilder extends AbstractComponentBuilder {
  type = 'Success';
  style = ButtonStyle.Success;
  constructor(label, metadata) {
    super();
    this.label = label;
    this.buttonId = [this.type, Math.random(), metadata].join(':');
  }
  createComponent() {
    return new ButtonBuilder().setLabel(this.label).setCustomId(this.buttonId).setStyle(this.style);
  }
}