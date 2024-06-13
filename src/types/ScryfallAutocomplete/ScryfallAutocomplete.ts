export default interface ScryfallAutocomplete {
  /** A content type for this object, always `catalog`. */
  object: 'catalog';
  /** A link to the current catalog on Scryfall’s API. */
  uri: string;
  /** The number of items in the data array. */
  total_values: number;
  /** An array of datapoints, as strings. */
  data: string[];
}
