import { CustomScryfallConfig } from '../../axios';
import scryfall from '../configs/scryfall-axios';
import AbstractHTTPService from './AbstractHTTPService';

export default class ScryfallService implements AbstractHTTPService {
  async getCard(
    ctx: CustomScryfallConfig['ctx'],
    name: string,
    mode?: 'exact' | 'fuzzy'
  ) {
    const card = await scryfall.get('/cards/named', {
      params: { [mode ?? 'fuzzy']: name },
      ctx,
    });

    return card;
  }
}
