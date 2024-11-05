import CardErrorBuilder from "../../builders/EmbedBuilders/CardErrorBuilder.js";
export default class ErrorsResponseBuilder {
  constructor(responses) {
    this.response = responses.failed;
    this.data = [];
    this.initialRows();
  }
  initialRows() {
    this.data = this.response.filter(({
      scryfall
    }) => scryfall.code === 'not_found' && scryfall.type !== 'ambiguous').map(({
      scryfall
    }) => scryfall);
  }
  createEmbeds() {
    return this.data.map(({
      details
    }) => {
      const errorEmbed = new CardErrorBuilder(details);
      return errorEmbed.create();
    }).reduce((prev, curr) => [...prev, ...curr], []);
  }
}