import { ChatInputCommandInteraction } from "discord.js";

export type ChatCommandCallback = (interaction: ChatInputCommandInteraction) => Promise<void>;