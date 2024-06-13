import { AxiosInstance } from 'axios';
import {
  AxiosScryfallError,
  AxiosScryfallSuccess,
  CustomResponseData,
} from '../../axios';
import AbstractHTTPService from './AbstractHTTPService';
import ScryfallCardModel from '../types/ScryfallCardModel/ScryfallCardModel';
import ScryfallResponseError from '../types/ScryfallResponseError/ScryfallResponseError';
import { Interaction, Message } from 'discord.js';
import ScryfallAutocomplete from '../types/ScryfallAutocomplete/ScryfallAutocomplete';

export type ScryfallReturn =
  | [AxiosScryfallSuccess, null]
  | [null, AxiosScryfallError];

export default class ScryfallService extends AbstractHTTPService {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    super();

    this.axios = axios;
  }

  isAxiosScryfallError(err: any): err is AxiosScryfallError {
    return 'isAxiosError' in err && err.isAxiosError;
  }

  async getById(
    ctx: Message | Interaction,
    id: string
  ): Promise<ScryfallReturn> {
    try {
      const card = await this.axios.get(`/cards/${id}`, { ctx });
      return [card, null];
    } catch (err) {
      if (!this.isAxiosScryfallError(err)) throw err;

      return [null, err];
    }
  }

  async getCard(
    ctx: Message | Interaction,
    name: string,
    mode?: 'exact' | 'fuzzy'
  ): Promise<ScryfallReturn> {
    try {
      const card = await this.axios.get('/cards/named', {
        params: { [mode ?? 'fuzzy']: name },
        ctx,
      });

      return [card, null];
    } catch (err) {
      if (!this.isAxiosScryfallError(err)) throw err;

      if (err.response?.data.scryfall.type === 'ambiguous') {
        const { data: axiosData, status } = await this.axios.get<
          CustomResponseData<ScryfallAutocomplete>
        >('/cards/autocomplete', {
          params: { q: name },
        });
        if (status >= 400) throw new Error('Autocomplete failed');
        err.response.data.scryfall.autocomplete = axiosData.scryfall.data;
      }

      return [null, err];
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
