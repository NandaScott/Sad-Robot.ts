import CustomError from "./CustomError.js";
export default class ImageUriError extends CustomError {
  name = 'ImageUriError';
  constructor(message, ctx) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, ImageUriError.prototype);
  }
}