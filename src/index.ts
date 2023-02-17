import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle, Client, IntentsBitField } from "discord.js";
import * as dotenv from 'dotenv'
import CommandManager from "./command-manager";
import deploy from './deploy-commands';
import buttonHandler from "./handlers/button-handler";
import { fetchAllCards, getCardDeclarations, getUniqueBy, isCardDeclaration, resolveScryfallResp, scrubDeclarationSyntax } from './utils/utils'

dotenv.config()

const intents = new IntentsBitField()
intents.add(
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.MessageContent
)

const client = new Client({ intents });

const comman = new CommandManager()

client.once('ready', () => {
  console.log('Ready!')
  deploy()
})

client.on('messageCreate', async (message) => {
  // This should be handled better
  try {
    const { author, content } = message;
    if (author.bot) return;

    if (!isCardDeclaration(content)) return;

    const cardDecs = getCardDeclarations(content)
    const cards = scrubDeclarationSyntax(cardDecs)
    const scryfallResp = fetchAllCards(cards)
    const resolvedCards = await resolveScryfallResp(scryfallResp)
    const uniqueCards = getUniqueBy(resolvedCards, 'id')
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(uniqueCards.map((card) =>
        new ButtonBuilder()
          .setCustomId(card.id)
          .setLabel(card.name)
          .setStyle(ButtonStyle.Primary)
      ))
    await message.reply({ components: [row] })
  } catch (e) {
    console.error(e)
    await message.reply({ content: "Something went wrong." })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    buttonHandler(interaction)
  }

  if (interaction.isSelectMenu()) {
    interaction.reply({ content: interaction.values[0], ephemeral: true })
  }

  if (interaction.isChatInputCommand()) {
    const command = comman.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }

})

client.login(process.env.TOKEN);