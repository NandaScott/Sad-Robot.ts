import { AxiosInstance } from 'axios';
import {
  AxiosScryfallError,
  AxiosScryfallSuccess,
  CustomResponseData,
  CustomScryfallConfig,
} from '../../axios';
import AbstractHTTPService from './AbstractHTTPService';
import ScryfallCardModel from '../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../types/ScryfallResponseError/ScryfallResponseError';

export type ScryfallReturn =
  | [AxiosScryfallSuccess, null]
  | [null, AxiosScryfallError];

export default class ScryfallService extends AbstractHTTPService {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    super();

    this.axios = axios;
  }

  async getCard(
    ctx: CustomScryfallConfig['ctx'],
    name: string,
    mode?: 'exact' | 'fuzzy'
  ): Promise<ScryfallReturn> {
    try {
      const card = await this.axios.get('/cards/named', {
        params: { [mode ?? 'fuzzy']: name },
        ctx,
      });

      return [card, null];
    } catch (err: any) {
      if (!err.isAxiosError) throw err;

      return [null, err as AxiosScryfallError];
    }
  }

  static async allSettled(cards: Promise<ScryfallReturn>[]) {
    const responses = await Promise.allSettled(cards).then((value) =>
      value
        .filter(
          (result): result is PromiseFulfilledResult<ScryfallReturn> =>
            result.status === 'fulfilled'
        )
        .map(({ value }) => value)
    );

    const successful: CustomResponseData<ScryfallCardModel>[] = responses
      .map((val) => val[0])
      .filter((val): val is AxiosScryfallSuccess => val !== null)
      .map(({ data }) => data);

    const failed: CustomResponseData<ScryfallResponseError>[] = responses
      .map((val) => val[1])
      .filter((val): val is AxiosScryfallError => val !== null)
      .map((val) => {
        if (!val.response?.data) throw new Error('No data from Scryfall');

        return val.response.data;
      });

    return {
      successful,
      failed,
    };
  }
}
