import { AxiosScryfallError, CustomScryfallConfig } from '../../axios';

export default abstract class CustomError extends Error {
  abstract name: string;
  abstract context: CustomScryfallConfig['ctx'];

  constructor(error: AxiosScryfallError, ctx: CustomScryfallConfig['ctx']) {
    super(error.message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
