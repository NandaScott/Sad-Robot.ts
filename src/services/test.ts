import { CustomScryfallConfig } from '../../axios';
import { ScryfallAxiosError } from '../configs/scryfall-axios';
import OutputFactory from '../handlers/output/OutputFactory';
import ScryfallService from './ScryfallService';

process.on('unhandledRejection', (reason: ScryfallAxiosError) => {
  if (reason.name === 'ScryfallError') {
    // Send reply to user
    const replyHandler = OutputFactory.createOutput('reply');
    replyHandler.addContents('[Mock reply] ' + reason.scryfall.details);
    replyHandler.addContext(reason.ctx);
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

  // This will fail
  context.message.content = "I'm sending a [[Not a Card]]";
  const card = await scryfallService.getCard(context, 'Not a Card', 'exact');

  if (!card) {
    throw new Error('Card not found');
  }

  console.log(card);
}

mockFunctionCall();
