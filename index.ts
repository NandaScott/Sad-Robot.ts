import { Client, GatewayIntentBits, Events } from "discord.js";
import { MessageHandler } from "./src/handlers/MessageHandler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Required for Guild interaction
    GatewayIntentBits.GuildMessages, // Required to listen for messages
    GatewayIntentBits.MessageContent, // Required to read message contents
    GatewayIntentBits.DirectMessages // Required to send emphemeral messages
  ]
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`)
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'ping') {
    const messageHandler = new MessageHandler(message.channel, 'Pong!');
    messageHandler.send();
  }
});

client.login(process.env.TOKEN);
