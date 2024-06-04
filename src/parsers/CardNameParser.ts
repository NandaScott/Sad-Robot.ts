export default class CardNameParser {
  static parse(input: string) {
    // prettier-ignore
    const doubleBrackets = /\[\[(.*?)\]\]/g;
    const matches =
      input.match(doubleBrackets)?.map((match) => match.slice(2, -2)) || [];
    return matches;
  }
}
