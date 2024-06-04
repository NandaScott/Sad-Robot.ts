import { CustomScryfallConfig } from './axios';
import blackhole from './src/configs/mock-axios';
import scryfall from './src/configs/scryfall-axios';
import ImageUriError from './src/errors/ImageUriError';
import ScryfallError from './src/errors/ScryfallError';
import OutputFactory from './src/handlers/OutputHandlers/OutputFactory';
import CardNameParser from './src/parsers/CardNameParser';
import ScryfallService from './src/services/ScryfallService';

type Errors = ScryfallError | ImageUriError | Error;

process.on('unhandledRejection', (reason: Errors) => {
  if (reason instanceof ScryfallError) {
    // Send reply to user
    const replyHandler = OutputFactory.createOutput('reply');
    replyHandler.addContents('[Mock reply] ' + reason.getDetails());
    replyHandler.addContext(reason.getContext());
    replyHandler.save();
  }

  // Log error to file
  const logHandler = OutputFactory.createOutput('logs');
  logHandler.error(`${reason.name}: ${reason.message}`);
});

const axiosConfig = Bun.argv.includes('--network-no-op') ? blackhole : scryfall;

async function mockFunctionCall() {
  const scryfallService = new ScryfallService(axiosConfig);
  // This is going to be the context surrounding the invocation of this function.
  const context: CustomScryfallConfig['ctx'] = {
    author: 'Me',
    sentAt: Date.now(),
    callingFunction: 'test',
    message: {
      content: '',
      reply: console.log,
    },
  };

  context.message.content = '[[Drowner of Truth]] [[bolt]]';
  const cards = CardNameParser.parse(context.message.content);
  cards.push('Not a Card');

  const requests = cards.map((card) =>
    scryfallService.getCard(context, card, 'fuzzy')
  );

  const responses = await ScryfallService.allSettled(requests);
  // { successes: [], failures: [] }
}

mockFunctionCall();
