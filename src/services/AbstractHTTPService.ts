import { CustomScryfallConfig } from '../../axios';

export default abstract class AbstractHTTPService {
  abstract getCard(
    ctx: CustomScryfallConfig['ctx'],
    name: string,
    mode?: 'exact' | 'fuzzy'
  ): any;
}
