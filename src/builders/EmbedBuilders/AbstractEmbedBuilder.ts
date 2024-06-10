import { APIEmbed } from 'discord.js';

export default abstract class AbstractEmbedBuilder {
  abstract create(): APIEmbed;
}
