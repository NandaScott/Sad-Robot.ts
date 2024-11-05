import { Colors, EmbedBuilder } from 'discord.js';
import AbstractEmbedBuilder from "./AbstractEmbedBuilder.js";
import DoubleFacedScryfallCard from "../../handlers/ScryfallCard/DoubleFacedScryfallCard.js";
export default class CardReplyBuilder extends AbstractEmbedBuilder {
  constructor(handler) {
    super();
    this.handler = handler;
  }
  create() {
    if (this.handler instanceof DoubleFacedScryfallCard) {
      const face1 = new EmbedBuilder().setColor(Colors.Blue).setTitle(this.handler.name).setImage(this.handler.frontFace).setURL(this.handler.uri).data;
      const face2 = new EmbedBuilder().setColor(Colors.Blue).setTitle(this.handler.name).setImage(this.handler.backFace).setURL(this.handler.uri).data;
      return [face1, face2];
    }
    const embed = new EmbedBuilder().setColor(Colors.Blue).setTitle(this.handler.name).setImage(this.handler.frontFace).setURL(this.handler.uri).data;
    return [embed];
  }
}