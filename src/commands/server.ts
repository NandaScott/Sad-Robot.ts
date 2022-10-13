import { SlashCommandBuilder } from "discord.js";
import { ChatCommandCallback } from "./types/execute-command-callback";

const server = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with server info!')

const execute: ChatCommandCallback = async (interaction) => {
  const { guild } = interaction
  await interaction.reply(`Server name: ${guild?.name}\nTotal members: ${guild?.memberCount}`);
}

export default {
  data: server,
  execute
}