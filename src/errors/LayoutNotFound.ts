import { CustomScryfallConfig } from '../../axios';
import CustomError from './CustomError';

export default class LayoutNotFound extends CustomError {
  name: string = 'LayoutNotFound';
  context: CustomScryfallConfig['ctx'];

  constructor(message: string, ctx: CustomScryfallConfig['ctx']) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, LayoutNotFound.prototype);
  }
}
