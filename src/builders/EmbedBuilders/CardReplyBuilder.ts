import { APIEmbed, Colors, EmbedBuilder } from 'discord.js';
import AbstractEmbedBuilder from './AbstractEmbedBuilder';
import SingleFacedScryfallCard from '../../handlers/ScryfallCard/SingleFacedScryfallCard';
import DoubleFacedScryfallCard from '../../handlers/ScryfallCard/DoubleFacedScryfallCard';

export default class CardReplyBuilder extends AbstractEmbedBuilder {
  private handler: SingleFacedScryfallCard | DoubleFacedScryfallCard;

  constructor(handler: SingleFacedScryfallCard | DoubleFacedScryfallCard) {
    super();
    this.handler = handler;
  }

  create(): APIEmbed[] {
    if (this.handler instanceof DoubleFacedScryfallCard) {
      const face1 = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle(this.handler.name)
        .setImage(this.handler.frontFace)
        .setURL(this.handler.uri).data;
      const face2 = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle(this.handler.name)
        .setImage(this.handler.backFace)
        .setURL(this.handler.uri).data;
      return [face1, face2];
    }

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle(this.handler.name)
      .setImage(this.handler.frontFace)
      .setURL(this.handler.uri).data;

    return [embed];
  }
}
