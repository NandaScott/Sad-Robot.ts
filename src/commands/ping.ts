import { SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!')

const execute: ChatCommandCallback = async (interaction) => {
  await interaction.reply('Pong!')
}

export default {
  data: ping,
  execute
}