import { ButtonBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonStyle, SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const buttons = new SlashCommandBuilder()
  .setName('buttons')
  .setDescription('Example of buttons')

const execute: ChatCommandCallback = async (interaction) => {
  const row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('secondary')
        .setLabel('Secondary')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('success')
        .setLabel('Success')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('danger')
        .setLabel('Danger')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setURL('https://google.com')
        .setLabel('Link')
        .setStyle(ButtonStyle.Link),
    );

  await interaction.reply({ content: 'I think you should', components: [row] })
}

export default {
  data: buttons,
  execute
}