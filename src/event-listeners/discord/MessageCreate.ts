import { ClientEvents, Events, Message } from 'discord.js';
import AbstractEventListener from '../AbstractEventListener';
import CardNameParser from '../../parsers/CardNameParser';
import { ScryfallService } from '../../services';
import {
  AmbiguousResponseBuilder,
  ErrorsResponseBuilder,
  SuccessfulResponseBuilder,
} from '../../handlers/Messages';

export default class MessageCreate extends AbstractEventListener<
  ClientEvents,
  Events.MessageCreate
> {
  event: Events.MessageCreate = Events.MessageCreate;
  scryfallService: ScryfallService;

  constructor(scryfallService: ScryfallService) {
    super();
    this.scryfallService = scryfallService;
  }

  async exec(message: Message<boolean>): Promise<void> {
    if (message.author.bot) return;

    const cards = CardNameParser.parse(message.content);

    // User should only be able to ping 5 cards at a time,
    // So that if they are all ambiguous returns, discord doesn't try to create
    // more than 5 action rows.
    if (cards.length > 5) {
      await message.reply({
        content:
          'Sorry! I am limited to only 5 cards per message. Please ping less cards, or break them up into multiple messages.',
      });
      return;
    }

    if (cards.length > 0) {
      const requests = cards.map((card) =>
        this.scryfallService.getCard(message, card, 'fuzzy')
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
  }
}
