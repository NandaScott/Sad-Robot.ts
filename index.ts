import {
  Client,
  GatewayIntentBits,
  Events,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  StringSelectMenuComponent,
  ActionRow,
} from 'discord.js';
import * as response from './test.json';
import SuccessfulResponseHandler from './src/handlers/SuccessfulResponseHandler/SuccessfulResponseHandler';
import { CustomResponseData } from './axios';
import ScryfallCardModel from './src/types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from './src/types/ScryfallResponseError/ScryfallResponseError';
import AmbiguousResponseBuilder from './src/handlers/AmbiguousResponseHandler/AmbiguousResponseHandler';
import ErrorsResponseBuilder from './src/handlers/ErrorsResponseBuilder/ErrorsResponseBuilder';
import SuccessButtonBuilder from './src/handlers/ComponentBuilders/SuccessButtonBuilder';
import DropDownBuilder from './src/handlers/ComponentBuilders/DropDownBuilder';
import SuccessRowBuilder from './src/handlers/ComponentBuilders/SuccessRowBuilder';
import AmbiguousRowBuilder from './src/handlers/ComponentBuilders/AmbiguousRowBuilder';

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
    const selectedValue = interaction.values[0];

    // === Start handling success rows ===

    const buttonRows = interaction.message.components
      // Capture only button rows
      .filter((row) =>
        row.components.every((comp) => comp.type === ComponentType.Button)
      );

    const successRows =
      buttonRows.length === 0 // Check to see if any button rows exist
        ? [new SuccessRowBuilder()] // If they don't create a single row builder
        : buttonRows // Otherwise, work with the rows we have.
            // Transform component data into data for row builder
            .map((row) =>
              row.components.map((comp) => ({
                ...comp.data,
                customId: comp.customId,
              }))
            )
            // Create a new set of row builders, and rebuild the button components
            .map((rowData) => {
              const row = new SuccessRowBuilder();
              rowData.forEach((compData) => {
                if (compData.type === ComponentType.Button) {
                  if (!compData.label) throw new Error(); // TODO
                  if (!compData.customId) throw new Error(); // TODO

                  const cardId = compData.customId.split(':').pop();
                  if (!cardId) throw new Error(); // TODO

                  const button = new SuccessButtonBuilder(
                    compData.label,
                    cardId
                  );
                  row.addComponent(button.createComponent());
                }
              });
              return row;
            });

    const lastSuccessRow = successRows.every(
      (row) => row.row.components.length === 4
    )
      ? new SuccessRowBuilder()
      : successRows.pop();

    if (lastSuccessRow instanceof SuccessRowBuilder) {
      const newButton = new SuccessButtonBuilder(selectedValue, selectedValue);
      lastSuccessRow.addComponent(newButton.createComponent());
    }

    if (lastSuccessRow !== undefined) {
      successRows.push(lastSuccessRow);
    }

    const finalSuccesses = successRows.map((row) => row.createComponent());

    // === End handling success rows ===

    // === Start handling ambiguous rows ===

    const dropdownRows = interaction.message.components
      // Capture only dropdown rows
      .filter(
        (row): row is ActionRow<StringSelectMenuComponent> =>
          row.components[0].data.type === ComponentType.StringSelect &&
          row.components[0].customId !== interaction.customId
      )
      .map((rowData) => {
        const compData = rowData.components[0];
        if (compData.placeholder === null) throw new Error();

        const row = new AmbiguousRowBuilder();
        const dropdown = new DropDownBuilder(compData.placeholder);
        row.addComponent(dropdown.createComponent());
        return row.createComponent();
      });

    // === End handling ambiguous rows ===

    const components = [...finalSuccesses, ...dropdownRows];

    await interaction.update({
      components,
    });
  }
});

client.login(process.env.TOKEN);
