import CustomError from "./CustomError.js";
export default class ScryfallError extends CustomError {
  name = 'ScryfallError';
  constructor(error, ctx) {
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