import { EmbedBuilder } from "@discordjs/builders";
import { ButtonInteraction, CacheType } from "discord.js";
import { getCardById } from "../services/scryfall";
import ScryfallCard from "../services/scryfall-card";
import { Params } from "../services/time-data";

export default async function buttonHandler(interaction: ButtonInteraction<CacheType>) {
  const { data: scryfall, config } = await getCardById(interaction.customId)
  const { timeData } = config.params as Params;

  const embed = createEmbed(scryfall, timeData.calc)
  interaction.reply({ embeds: [embed], ephemeral: true })
}

function createEmbed(card: ScryfallCard, timer: number): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`**${card.name}**`)
    .setImage(card.image_uris.normal)
    .setFooter({ text: `Fetch took: ${timer} seconds.` })
    .setColor(0x1b6f9)
}