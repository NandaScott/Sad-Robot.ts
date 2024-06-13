export default class NoOutputSpecified extends Error {
  name: string = 'NoOutputSpecified';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoOutputSpecified.prototype);
  }
}
