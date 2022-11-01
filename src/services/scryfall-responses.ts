export interface Catalog {
  object: 'catalog'
  total_values: number
  uri: string
  data: string[]
}

export interface Ruling {
  object: 'ruling';
  oracle_id: string;
  source: 'wotc' | 'scryfall'
  published_at: string;
  comment: string;
}

export interface Rulings {
  object: 'list';
  has_more: boolean;
  data: Ruling[]
}