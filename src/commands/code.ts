import { SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const server = new SlashCommandBuilder()
  .setName('code')
  .setDescription('Uses the set code and collector number to fetch a card.')
  .addStringOption(option =>
    option.setName('set_code')
      .setDescription('The 3-4 letter set code')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('collector_number')
      .setDescription('The collector number of the card')
      .setRequired(true)
  )

const execute: ChatCommandCallback = async (interaction) => {
  const { options } = interaction
  const code = options.getString('set_code')
  const num = options.getString('collector_number')
  await interaction.reply(`${code}, ${num}`);
}

export default {
  data: server,
  execute
}