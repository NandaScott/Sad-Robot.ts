import {
  Client,
  GatewayIntentBits,
  Events,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from 'discord.js';

const thal = [
  'Thallid',
  'Thalakos Seer',
  'Thalakos Scout',
  "Thalia's Lancers",
  'Thalakos Sentry',
  'Thallid Devourer',
  'Thallid Omnivore',
  'Thalakos Mistfolk',
  'Thalakos Lowlands',
  'Thalakos Deceiver',
  'Thalakos Drifters',
  'Thallid Soothsayer',
  'Thallid Germinator',
  "Thalia's Lieutenant",
  'Thalakos Dreamsower',
  "Thalia's Geistcaller",
  'Thalia, Heretic Cathar',
  'Thallid Shell-Dweller',
  'Thalisse, Reverent Medium',
  'Thalia, Guardian of Thraben',
].map((val) => new StringSelectMenuOptionBuilder().setLabel(val).setValue(val));

const omnath = [
  'Omnath, Locus of All',
  'Omnath, Locus of Mana',
  'Omnath, Locus of Rage',
  'Omnath, Locus of the Roil',
  'Omnath, Locus of Creation',
  'A-Omnath, Locus of Creation',
  'Henrika Domnathi // Henrika, Infernal Seer',
].map((val) => new StringSelectMenuOptionBuilder().setLabel(val).setValue(val));

const rng = () => Math.floor(Math.random() * 2);

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
    const success = new ButtonBuilder()
      .setLabel('Lightning Bolt')
      .setCustomId(`Success:${rng()}:77c6fa74-5543-42ac-9ead-0e890b188e99`)
      .setStyle(ButtonStyle.Success);

    const auto1 = new StringSelectMenuBuilder()
      .setCustomId(`Auto:${rng()}:Thal`)
      .setPlaceholder('Too many cards match ambiguous name “thal”')
      .setOptions(thal);

    const auto2 = new StringSelectMenuBuilder()
      .setCustomId(`Auto:${rng()}:Omnath`)
      .setPlaceholder('Too many cards match ambiguous name “omnath”')
      .setOptions(omnath);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(success);

    const row2 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      auto1
    );
    const row3 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      auto2
    );

    await message.reply({
      content: 'Choose your starter!',
      components: [row, row2, row3],
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
        const newId = `${type}:${rng()}:${meta}`;
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
          const newId = `${type}:${rng()}:${meta}`;
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
