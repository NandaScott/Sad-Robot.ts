import { CustomScryfallConfig } from '../../axios';
import CustomError from './CustomError';

export default class ImageUriError extends CustomError {
  name: string = 'ImageUriError';
  context: CustomScryfallConfig['ctx'];

  constructor(message: string, ctx: CustomScryfallConfig['ctx']) {
    super(message);
    this.context = ctx;

    Object.setPrototypeOf(this, ImageUriError.prototype);
  }
}
