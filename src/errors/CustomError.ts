import { CustomScryfallConfig } from '../../axios';

export default abstract class CustomError extends Error {
  abstract name: string;
  abstract context: CustomScryfallConfig['ctx'];

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
