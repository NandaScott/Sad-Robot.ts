import CustomError from "./CustomError.js";
export default class LayoutNotFound extends CustomError {
  name = 'LayoutNotFound';
  constructor(message, ctx) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, LayoutNotFound.prototype);
  }
}