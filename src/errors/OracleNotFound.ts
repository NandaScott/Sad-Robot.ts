import { CustomScryfallConfig } from '../../axios';
import CustomError from './CustomError';

export default class OracleNotFound extends CustomError {
  name: string = 'OracleNotFound';
  context: CustomScryfallConfig['ctx'];

  constructor(message: string, ctx: CustomScryfallConfig['ctx']) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, OracleNotFound.prototype);
  }
}
