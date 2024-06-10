import { Client, GatewayIntentBits, Events } from 'discord.js';
import * as response from './test.json';
import SuccessfulResponseHandler from './src/handlers/SuccessfulResponseHandler/SuccessfulResponseHandler';
import { CustomResponseData } from './axios';
import ScryfallCardModel from './src/types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from './src/types/ScryfallResponseError/ScryfallResponseError';
import AmbiguousResponseBuilder from './src/handlers/AmbiguousResponseHandler/AmbiguousResponseHandler';
import ErrorsResponseBuilder from './src/handlers/ErrorsResponseBuilder/ErrorsResponseBuilder';
import AmbiguousHandler from './src/handlers/Interactions/AmbiguousHandler';
import SuccessRows from './src/handlers/Interactions/SuccessRows';

const mockResponse = response as unknown as {
  successful: CustomResponseData<ScryfallCardModel>[];
  failed: CustomResponseData<ScryfallResponseError>[];
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Required for Guild interaction
    GatewayIntentBits.GuildMessages, // Required to listen for messages
    GatewayIntentBits.MessageContent, // Required to read message contents
    GatewayIntentBits.DirectMessages, // Required to send emphemeral messages
  ],
});

client.on(Events.ClientReady, async (event) => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'test fetch') {
    const successes = new SuccessfulResponseHandler(
      mockResponse
    ).createSuccessRows();

    const ambiguous = new AmbiguousResponseBuilder(
      mockResponse
    ).createAmbiguousRows();

    const errors = new ErrorsResponseBuilder(mockResponse).createEmbeds();

    const components = [...successes, ...ambiguous];

    await message.reply({
      content: 'Here are your cards!',
      components,
      embeds: [...errors],
    });
  }

  // Note: User should only be able to ping 5 cards at a time,
  // So that if they are all ambiguous returns, discord doesn't try to create
  // more than 5 action rows.
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const successRows = SuccessRows.handleSuccessRows(interaction);

    const dropdownRows = AmbiguousHandler.handleAmbiguousRows(interaction);

    await interaction.update({
      components: [...successRows, ...dropdownRows],
    });
  }
});

client.login(process.env.TOKEN);
