import { CustomScryfallConfig } from '../../axios';
import ImageUriError from '../errors/ImageUriError';
import ScryfallError from '../errors/ScryfallError';
import OutputFactory from '../handlers/output/OutputFactory';
import ScryfallService from './ScryfallService';

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

async function mockFunctionCall() {
  const scryfallService = new ScryfallService();
  const context: CustomScryfallConfig['ctx'] = {
    author: 'Me',
    sentAt: Date.now(),
    callingFunction: 'test',
    message: {
      content: '',
      reply: console.log,
    },
  };

  context.message.content = "I'm sending a [[Lightning Bolt]]";
  const [happyCard, happyError] = await scryfallService.getCard(
    context,
    'Lightning Bolt',
    'exact'
  );

  console.log(happyCard?.data.scryfall.name); // Lightning Bolt

  // This will fail
  context.message.content = "I'm sending a [[Not a Card]]";
  const [sadCard, sadError] = await scryfallService.getCard(
    context,
    'Not a Card',
    'exact'
  );

  if (sadError) {
    throw new ScryfallError(sadError, context);
  }

  console.log('I will not be run');
}

mockFunctionCall();
