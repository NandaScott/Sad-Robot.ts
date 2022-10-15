import { SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const server = new SlashCommandBuilder()
  .setName('options')
  .setDescription('Replies with your input')
  .addStringOption(option =>
    option.setName('input')
      .setDescription('The input to echo back')
      .addChoices(
        { name: 'Funny', value: 'gif_funny' },
        { name: 'Meme', value: 'gif_meme' },
        { name: 'Movie', value: 'gif_movie' },
      )
      .setRequired(true)
  )

const execute: ChatCommandCallback = async (interaction) => {
  await interaction.reply(interaction.options.getString('input') as string);
}

export default {
  data: server,
  execute
}