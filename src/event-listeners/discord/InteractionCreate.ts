import { CacheType, ClientEvents, Events, Interaction } from 'discord.js';
import AbstractEventListener from '../AbstractEventListener';
import CardIdParser from '../../parsers/CardIdParser';
import { ScryfallService } from '../../services';
import ScryfallCardFactory from '../../handlers/ScryfallCard/ScryfallCardFactory';
import CardReplyBuilder from '../../builders/EmbedBuilders/CardReplyBuilder';
import SuccessRows from '../../handlers/Interactions/SuccessRows';
import AmbiguousHandler from '../../handlers/Interactions/AmbiguousHandler';

export default class InteractionCreate extends AbstractEventListener<
  ClientEvents,
  Events.InteractionCreate
> {
  event: Events.InteractionCreate = Events.InteractionCreate;
  scryfallService: ScryfallService;

  constructor(scryfallService: ScryfallService) {
    super();
    this.scryfallService = scryfallService;
  }

  async exec(interaction: Interaction<CacheType>): Promise<void> {
    if (interaction.isButton()) {
      const [type, rng, idOrName] = interaction.customId.split(':');
      const getData = CardIdParser.parse(idOrName)
        ? this.scryfallService.getById(interaction, idOrName)
        : this.scryfallService.getCard(interaction, idOrName);

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
  }
}
