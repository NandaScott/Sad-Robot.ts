import { Colors, EmbedBuilder } from 'discord.js';
import AbstractEmbedBuilder from "./AbstractEmbedBuilder.js";
export default class CardErrorBuilder extends AbstractEmbedBuilder {
  constructor(error) {
    super();
    this.error = error;
  }
  create() {
    const embed = new EmbedBuilder({
      color: Colors.Red,
      title: this.error
    }).data;
    return [embed];
  }
}