export default abstract class CustomError extends Error {
  abstract name: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
