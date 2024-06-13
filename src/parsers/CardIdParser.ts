export default class CardIdParser {
  static parse(input: string) {
    // prettier-ignore
    const uuid =
      /[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}/g;
    return input.match(uuid);
  }
}
