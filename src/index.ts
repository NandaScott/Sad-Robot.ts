import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from 'dotenv'
import CommandManager from "./command-manager";
import deploy from './deploy-commands';

dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const comman = new CommandManager()

client.once('ready', () => {
  console.log('Ready!')
  deploy()
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = comman.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
})

client.login(process.env.TOKEN);