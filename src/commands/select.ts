import { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const select = new SlashCommandBuilder()
  .setName('select')
  .setDescription('Example of a select menu')

// Possible use for a card error
const execute: ChatCommandCallback = async (interaction) => {
  const row = new ActionRowBuilder<SelectMenuBuilder>()
    .addComponents(
      new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions(
          {
            label: 'Select me',
            description: 'This is a description',
            value: 'first_option',
          },
          {
            label: 'You can select me too',
            description: 'This is also a description',
            value: 'second_option',
          },
        ),
    );

  const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setDescription('Some description here');

  await interaction.reply({ content: 'Select an option', ephemeral: true, embeds: [embed], components: [row] });
}

export default {
  data: select,
  execute
}