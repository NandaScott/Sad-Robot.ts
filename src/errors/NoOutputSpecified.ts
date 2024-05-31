import { CustomScryfallConfig } from '../../axios';
import CustomError from './CustomError';

export default class NoOutputSpecified extends CustomError {
  name: string = 'NoOutputSpecified';
  context: CustomScryfallConfig['ctx'];

  constructor(message: string, ctx?: CustomScryfallConfig['ctx']) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, NoOutputSpecified.prototype);
  }
}
