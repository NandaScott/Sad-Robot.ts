import { ScryfallAxiosError } from '../configs/scryfall-axios';
import ScryfallService from './ScryfallService';

process.on('uncaughtException', (error) => {
  console.log(error);
});

process.on('unhandledRejection', (reason: ScryfallAxiosError) => {
  if (reason.name === 'ScryfallError') {
    // handleScryfallError
    console.log(
      `[${new Date().toISOString()}] ${reason.name}: ${reason.scryfall.details}`
    );
  }
});

async function test() {
  const scryfallService = new ScryfallService();

  scryfallService.getCard(
    {
      author: 'Me',
      sentAt: Date.now(),
      content: "I'm sending [[Not a Card]]",
      callingFunction: 'test',
    },
    'Not a Card',
    'exact'
  );
}

test();
