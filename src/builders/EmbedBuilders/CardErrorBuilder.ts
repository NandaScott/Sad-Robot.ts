import { Colors, EmbedBuilder } from 'discord.js';
import AbstractEmbedBuilder from './AbstractEmbedBuilder';

export default class CardErrorBuilder extends AbstractEmbedBuilder {
  error: string;

  constructor(error: string) {
    super();
    this.error = error;
  }

  create() {
    const embed = new EmbedBuilder({
      color: Colors.Red,
      title: this.error,
    }).data;
    return [embed];
  }
}
