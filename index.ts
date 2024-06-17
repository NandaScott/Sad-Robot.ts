import { Client } from 'discord.js';
import { MockAxios, ScryfallAxios } from './src/configs';
import { ScryfallService } from './src/services';
import ClientReady from './src/event-listeners/discord/ClientReady';
import intents from './src/utils/intents';
import MessageCreate from './src/event-listeners/discord/MessageCreate';
import InteractionCreate from './src/event-listeners/discord/InteractionCreate';

const axiosConfig = Bun.argv.includes('--network-no-op')
  ? MockAxios
  : ScryfallAxios;

const scryfallService = new ScryfallService(axiosConfig);

const client = new Client({
  intents,
});

const ready = new ClientReady();
client.on(ready.event, (client) => ready.exec(client));

const messageCreate = new MessageCreate(scryfallService);
client.on(messageCreate.event, (message) => messageCreate.exec(message));

const interactionCreate = new InteractionCreate(scryfallService);
client.on(interactionCreate.event, (interaction) =>
  interactionCreate.exec(interaction)
);

client.login(process.env.TOKEN);
