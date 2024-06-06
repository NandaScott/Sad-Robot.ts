import {
  Client,
  GatewayIntentBits,
  Events,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  AnyComponentBuilder,
} from 'discord.js';
import SuccessButtonBuilder from './src/handlers/ComponentBuilders/SuccessButtonBuilder';
import DropDownBuilder from './src/handlers/ComponentBuilders/DropDownBuilder';
import SuccessRowBuilder from './src/handlers/ComponentBuilders/SuccessRowBuilder';
import AmbiguousRowBuilder from './src/handlers/ComponentBuilders/AmbiguousRowBuilder';
import * as response from './test.json';
import AbstractComponentBuilder, {
  AllBuilderTypes,
} from './src/handlers/ComponentBuilders/AbstractComponentBuilder';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Required for Guild interaction
    GatewayIntentBits.GuildMessages, // Required to listen for messages
    GatewayIntentBits.MessageContent, // Required to read message contents
    GatewayIntentBits.DirectMessages, // Required to send emphemeral messages
  ],
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === 'button') {
    const successRows = response.successful
      .map(
        ({ scryfall }) => new SuccessButtonBuilder(scryfall.name, scryfall.id)
      )
      .map((builder) => {
        const row = new SuccessRowBuilder();
        row.addComponent(builder.createComponent());
        return row.createComponent();
      });

    const ambiguousRows = response.failed
      .filter(({ scryfall }) => scryfall.type === 'ambiguous')
      .map(({ scryfall }) => new DropDownBuilder(scryfall.details))
      .map((builder) => {
        const row = new AmbiguousRowBuilder();
        row.addComponent(builder.createComponent());
        return row.createComponent();
      });

    const components = [...successRows, ...ambiguousRows];

    await message.reply({
      content: 'Choose your starter!',
      components,
    });
  }
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
