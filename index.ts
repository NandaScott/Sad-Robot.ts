import { Client, GatewayIntentBits, Events } from 'discord.js';
import AmbiguousHandler from './src/handlers/Interactions/AmbiguousHandler';
import SuccessRows from './src/handlers/Interactions/SuccessRows';
import {
  AmbiguousResponseBuilder,
  ErrorsResponseBuilder,
  SuccessfulResponseBuilder,
} from './src/handlers/Messages';
import { MockAxios, ScryfallAxios } from './src/configs';
import { ScryfallService } from './src/services';
import CardNameParser from './src/parsers/CardNameParser';
import CardIdParser from './src/parsers/CardIdParser';
import ScryfallCardFactory from './src/handlers/ScryfallCard/ScryfallCardFactory';
import CardReplyBuilder from './src/builders/EmbedBuilders/CardReplyBuilder';
import ClientReady from './src/event-listeners/discord/ClientReady';
import intents from './src/utils/intents';

const axiosConfig = Bun.argv.includes('--network-no-op')
  ? MockAxios
  : ScryfallAxios;

const scryfallService = new ScryfallService(axiosConfig);

const client = new Client({
  intents,
});

const ready = new ClientReady();
client.on(ready.event, ready.exec);

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const cards = CardNameParser.parse(message.content);

  // User should only be able to ping 5 cards at a time,
  // So that if they are all ambiguous returns, discord doesn't try to create
  // more than 5 action rows.
  if (cards.length > 5) {
    return await message.reply({
      content:
        'Sorry! I am limited to only 5 cards per message. Please ping less cards, or break them up into multiple messages.',
    });
  }

  if (cards.length > 0) {
    const requests = cards.map((card) =>
      scryfallService.getCard(message, card, 'fuzzy')
    );

    const responses = await ScryfallService.allSettled(requests);

    const successes = new SuccessfulResponseBuilder(
      responses
    ).createSuccessRows();

    const ambiguous = new AmbiguousResponseBuilder(
      responses
    ).createAmbiguousRows();

    const errors = new ErrorsResponseBuilder(responses).createEmbeds();

    const components = [...successes, ...ambiguous];

    await message.reply({
      components,
      embeds: errors,
    });
  }
});

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
