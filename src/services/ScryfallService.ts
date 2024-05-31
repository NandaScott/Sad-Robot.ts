import {
  AxiosScryfallError,
  AxiosScryfallSuccess,
  CustomScryfallConfig,
} from '../../axios';
import scryfall from '../configs/scryfall-axios';
import AbstractHTTPService from './AbstractHTTPService';

export default class ScryfallService implements AbstractHTTPService {
  async getCard(
    ctx: CustomScryfallConfig['ctx'],
    name: string,
    mode?: 'exact' | 'fuzzy'
  ): Promise<[AxiosScryfallSuccess, null] | [null, AxiosScryfallError]> {
    try {
      const card = await scryfall.get('/cards/named', {
        params: { [mode ?? 'fuzzy']: name },
        ctx,
      });

      return [card, null];
    } catch (err: any) {
      if (!err.isAxiosError) throw err;

      return [null, err as AxiosScryfallError];
    }
  }
}
