import { SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const basicSlash = new SlashCommandBuilder()
  .setName('basic')
  .setDescription('Replies with your name.')

const execute: ChatCommandCallback = async (interaction) => {
  await interaction.reply(interaction.user.username)
}

export default {
  data: basicSlash,
  execute
}