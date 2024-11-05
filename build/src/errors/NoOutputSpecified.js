export default class NoOutputSpecified extends Error {
  name = 'NoOutputSpecified';
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NoOutputSpecified.prototype);
  }
}