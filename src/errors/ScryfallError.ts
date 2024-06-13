import { Interaction, Message } from 'discord.js';
import { AxiosScryfallError, CustomResponseData } from '../../axios';
import ScryfallResponseError from '../types/ScryfallResponseError/ScryfallResponseError';
import CustomError from './CustomError';

export default class ScryfallError extends CustomError {
  name: string = 'ScryfallError';
  context: Message | Interaction;
  data: CustomResponseData<ScryfallResponseError> | undefined;

  constructor(error: AxiosScryfallError, ctx: Message | Interaction) {
    super(error.message);
    this.context = ctx;
    this.data = error.response?.data;

    Object.setPrototypeOf(this, ScryfallError.prototype);
  }

  getDetails() {
    return this.data?.scryfall.details;
  }

  getContext() {
    return this.context;
  }
}
