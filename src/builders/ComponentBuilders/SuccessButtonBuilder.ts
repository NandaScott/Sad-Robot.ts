import { ButtonBuilder, ButtonStyle } from 'discord.js';
import AbstractComponentBuilder from './AbstractComponentBuilder';

export default class SuccessButtonBuilder extends AbstractComponentBuilder {
  type: string = 'Success';
  buttonId: string;
  label: string;
  style: ButtonStyle = ButtonStyle.Success;

  constructor(label: string, metadata: string) {
    super();
    this.label = label;
    this.buttonId = [this.type, Math.random(), metadata].join(':');
  }

  createComponent() {
    return new ButtonBuilder()
      .setLabel(this.label)
      .setCustomId(this.buttonId)
      .setStyle(this.style);
  }
}
