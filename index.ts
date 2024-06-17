import { Client, Events } from 'discord.js';
import AmbiguousHandler from './src/handlers/Interactions/AmbiguousHandler';
import SuccessRows from './src/handlers/Interactions/SuccessRows';
import { MockAxios, ScryfallAxios } from './src/configs';
import { ScryfallService } from './src/services';
import CardIdParser from './src/parsers/CardIdParser';
import ScryfallCardFactory from './src/handlers/ScryfallCard/ScryfallCardFactory';
import CardReplyBuilder from './src/builders/EmbedBuilders/CardReplyBuilder';
import ClientReady from './src/event-listeners/discord/ClientReady';
import intents from './src/utils/intents';
import MessageCreate from './src/event-listeners/discord/MessageCreate';

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

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    const [type, rng, idOrName] = interaction.customId.split(':');
    const getData = CardIdParser.parse(idOrName)
      ? scryfallService.getById(interaction, idOrName)
      : scryfallService.getCard(interaction, idOrName);

    const [card, error] = await getData;
    if (error) throw new Error();
    const cardHandler = new ScryfallCardFactory(
      card.data.scryfall,
      interaction
    ).createCard();

    const embeds = new CardReplyBuilder(cardHandler).create();

    await interaction.reply({ embeds, ephemeral: true });
  }
  if (interaction.isStringSelectMenu()) {
    const successRows = SuccessRows.handleSuccessRows(interaction);

    const dropdownRows = AmbiguousHandler.handleAmbiguousRows(interaction);

    await interaction.update({
      components: [...successRows, ...dropdownRows],
    });
  }
});

client.login(process.env.TOKEN);
