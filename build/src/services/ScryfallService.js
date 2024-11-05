import AbstractHTTPService from "./AbstractHTTPService.js";
export default class ScryfallService extends AbstractHTTPService {
  constructor(axios) {
    super();
    this.axios = axios;
  }
  isAxiosScryfallError(err) {
    return 'isAxiosError' in err && err.isAxiosError;
  }
  async getById(ctx, id) {
    try {
      const card = await this.axios.get(`/cards/${id}`, {
        ctx
      });
      return [card, null];
    } catch (err) {
      if (!this.isAxiosScryfallError(err)) throw err;
      return [null, err];
    }
  }
  async getCard(ctx, name, mode) {
    try {
      const card = await this.axios.get('/cards/named', {
        params: {
          [mode ?? 'fuzzy']: name
        },
        ctx
      });
      return [card, null];
    } catch (err) {
      if (!this.isAxiosScryfallError(err)) throw err;
      if (err.response?.data.scryfall.type === 'ambiguous') {
        const {
          data: axiosData,
          status
        } = await this.axios.get('/cards/autocomplete', {
          params: {
            q: name
          }
        });
        if (status >= 400) throw new Error('Autocomplete failed');
        err.response.data.scryfall.autocomplete = axiosData.scryfall.data;
      }
      return [null, err];
    }
  }
  static async allSettled(cards) {
    const responses = await Promise.allSettled(cards).then(value => value.filter(result => result.status === 'fulfilled').map(({
      value
    }) => value));
    const successful = responses.map(val => val[0]).filter(val => val !== null).map(({
      data
    }) => data);
    const failed = responses.map(val => val[1]).filter(val => val !== null).map(val => {
      if (!val.response?.data) throw new Error('No data from Scryfall');
      return val.response.data;
    });
    return {
      successful,
      failed
    };
  }
}