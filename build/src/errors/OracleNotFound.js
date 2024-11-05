import CustomError from "./CustomError.js";
export default class OracleNotFound extends CustomError {
  name = 'OracleNotFound';
  constructor(message, ctx) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, OracleNotFound.prototype);
  }
}