import { Events } from 'discord.js';
import AbstractEventListener from "../AbstractEventListener.js";
import CardIdParser from "../../parsers/CardIdParser.js";
import ScryfallCardFactory from "../../handlers/ScryfallCard/ScryfallCardFactory.js";
import CardReplyBuilder from "../../builders/EmbedBuilders/CardReplyBuilder.js";
import SuccessRows from "../../handlers/Interactions/SuccessRows.js";
import AmbiguousHandler from "../../handlers/Interactions/AmbiguousHandler.js";
import HypergeoCommand from "../../commands/HypergeoCommand.js";
export default class InteractionCreate extends AbstractEventListener {
  event = Events.InteractionCreate;
  constructor(scryfallService) {
    super();
    this.scryfallService = scryfallService;
  }
  async exec(interaction) {
    if (interaction.isButton()) {
      const [type, rng, idOrName] = interaction.customId.split(':');
      const getData = CardIdParser.parse(idOrName) ? this.scryfallService.getById(interaction, idOrName) : this.scryfallService.getCard(interaction, idOrName);
      const [card, error] = await getData;
      if (error) throw new Error();
      const cardHandler = new ScryfallCardFactory(card.data.scryfall, interaction).createCard();
      const embeds = new CardReplyBuilder(cardHandler).create();
      await interaction.reply({
        embeds,
        ephemeral: true
      });
    }
    if (interaction.isStringSelectMenu()) {
      const successRows = SuccessRows.handleSuccessRows(interaction);
      const dropdownRows = AmbiguousHandler.handleAmbiguousRows(interaction);
      await interaction.update({
        components: [...successRows, ...dropdownRows]
      });
    }
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'hypergeo') {
        new HypergeoCommand().exec(interaction);
      }
    }
  }
}