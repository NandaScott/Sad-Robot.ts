import 'dotenv/config';
import { Client } from 'discord.js';
import { ScryfallAxios } from "./src/configs/index.js";
import { ScryfallService } from "./src/services/index.js";
import ClientReady from "./src/event-listeners/discord/ClientReady.js";
import intents from "./src/utils/intents.js";
import MessageCreate from "./src/event-listeners/discord/MessageCreate.js";
import InteractionCreate from "./src/event-listeners/discord/InteractionCreate.js";
import HypergeoCommand from "./src/commands/HypergeoCommand.js";
import SlashCommandHandler from "./src/commands/SlashCommandHandler.js";
const scryfallService = new ScryfallService(ScryfallAxios);
const client = new Client({
  intents
});
const ready = new ClientReady();
client.on(ready.event, client => ready.exec(client));
const messageCreate = new MessageCreate(scryfallService);
client.on(messageCreate.event, message => messageCreate.exec(message));
const interactionCreate = new InteractionCreate(scryfallService);
client.on(interactionCreate.event, interaction => interactionCreate.exec(interaction));
const commandHandler = new SlashCommandHandler();
commandHandler.registerCommand(HypergeoCommand);
commandHandler.sendRequest();
client.login(process.env.TOKEN);