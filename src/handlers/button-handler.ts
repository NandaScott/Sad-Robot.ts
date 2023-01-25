import { EmbedBuilder } from "@discordjs/builders";
import { ButtonInteraction, CacheType } from "discord.js";
import { getCardById, NormalizedCard } from "../services/scryfall";
import { Params } from "../services/time-data";

export default async function buttonHandler(interaction: ButtonInteraction<CacheType>) {
  const { data: scryfall, config } = await getCardById(interaction.customId)
  const { timeData } = config.params as Params;

  const embeds = scryfall.map((card) => createEmbed(card, timeData.calc))

  interaction.reply({ embeds, ephemeral: true })
}

function createEmbed(card: NormalizedCard, timer: number): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`**${card.name}**`)
    .setURL(card.scryfall_uri)
    .setImage(card.image_uris.normal)
    .setFooter({ text: `Fetch took: ${timer} seconds.` })
    .setColor(0x1b6f9)
}