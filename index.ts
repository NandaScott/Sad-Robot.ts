import {
  Client,
  GatewayIntentBits,
  Events,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from 'discord.js';
import * as response from './test.json';
import SuccessfulResponseHandler from './src/handlers/SuccessfulResponseHandler/SuccessfulResponseHandler';
import { CustomResponseData } from './axios';
import ScryfallCardModel from './src/types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from './src/types/ScryfallResponseError/ScryfallResponseError';
import AmbiguousResponseBuilder from './src/handlers/AmbiguousResponseHandler/AmbiguousResponseHandler';
import ErrorsResponseBuilder from './src/handlers/ErrorsResponseBuilder/ErrorsResponseBuilder';

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
  const defaultChannel = await client.channels.fetch('351895958780379148');

  if (defaultChannel?.isTextBased()) {
    const successes = new SuccessfulResponseHandler(
      mockResponse
    ).createSuccessRows();

    const ambiguous = new AmbiguousResponseBuilder(
      mockResponse
    ).createAmbiguousRows();

    const errors = new ErrorsResponseBuilder(mockResponse).createEmbeds();

    const components = [...successes, ...ambiguous];

    await defaultChannel.send({
      content: 'Here are your cards!',
      components,
      embeds: [...errors],
    });
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selectedValue = interaction.values[0];

    const successfulButtons = interaction.message.components
      .filter((val) => {
        const componentTypes = val.components.map((comp) => comp.type);
        if (componentTypes.includes(ComponentType.Button)) return true;
        return false;
      })[0]
      .components.map((comp): any => comp.data)
      .map((data) => {
        const [type, id, meta] = data.custom_id.split(':');
        const newId = `${type}:${Math.random()}:${meta}`;
        const rebuiltButton = new ButtonBuilder(data);
        rebuiltButton.setCustomId(newId);
        return rebuiltButton;
      });

    let foundFurtherErrors = interaction.message.components.filter((val) => {
      const componentTypes = val.components.map((comp) => comp.type);
      const componentIds = val.components.map((comp) => comp.customId);
      if (
        componentTypes.includes(ComponentType.StringSelect) &&
        !componentIds.includes(interaction.customId)
      )
        return true;
      return false;
    });

    let furtherErrors: StringSelectMenuBuilder[] = [];

    if (foundFurtherErrors.length > 0) {
      furtherErrors = foundFurtherErrors[0].components
        .map((comp): any => comp.data)
        .map((data) => {
          const [type, id, meta] = data.custom_id.split(':');
          const newId = `${type}:${Math.random()}:${meta}`;
          const rebuiltMenu = new StringSelectMenuBuilder(data);
          rebuiltMenu.setCustomId(newId);
          return rebuiltMenu;
        });
    }

    const selected = new ButtonBuilder()
      .setLabel(selectedValue)
      .setCustomId(`Success:77c6fa74-5543-42ac-9ead-0e890b188e99`)
      .setStyle(ButtonStyle.Success);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(successfulButtons)
      .addComponents(selected);

    const components: (
      | ActionRowBuilder<ButtonBuilder>
      | ActionRowBuilder<StringSelectMenuBuilder>
    )[] = [buttonRow];

    if (furtherErrors.length > 0) {
      components.push(
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          furtherErrors
        )
      );
    }

    await interaction.update({
      components,
    });
  }
});

client.login(process.env.TOKEN);
