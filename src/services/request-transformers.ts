import { NormalizedCard } from "./scryfall";
import ScryfallCard, { ImageUris, Layout } from "./scryfall-card";

export function stripProps(data: string): NormalizedCard[] {
  const card = JSON.parse(data) as ScryfallCard;

  return normalizeCard(card)
}

const normalizeCard = (card: ScryfallCard): NormalizedCard[] => {
  const handlers: Record<Layout, (card: ScryfallCard) => NormalizedCard[]> = {
    normal: handleSingleFace,
    split: handleSingleFace,
    flip: handleSingleFace,
    transform: handleDoubleFace,
    modal_dfc: handleDoubleFace,
    meld: handleSingleFace,
    leveler: handleSingleFace,
    class: handleSingleFace,
    saga: handleSingleFace,
    adventure: handleSingleFace,
    planar: handleSingleFace,
    scheme: handleSingleFace,
    vanguard: handleSingleFace,
    token: handleSingleFace,
    double_faced_token: handleDoubleFace,
    emblem: handleSingleFace,
    augment: handleSingleFace,
    host: handleSingleFace,
    art_series: handleSingleFace,
    reversible_card: handleDoubleFace
  }

  const func = handlers[card.layout]

  return func(card)
}

const handleSingleFace = (card: ScryfallCard): NormalizedCard[] => [
  {
    id: card.id,
    image_uris: card.image_uris,
    layout: card.layout,
    name: card.name,
    scryfall_uri: card.scryfall_uri
  }
];

const handleDoubleFace = (card: ScryfallCard): NormalizedCard[] => {
  const { card_faces } = card;
  if (!card_faces) return [];
  return card_faces?.map((face) => ({
    id: card.id,
    layout: card.layout,
    name: card.name,
    scryfall_uri: card.scryfall_uri,
    image_uris: face.image_uris
  }))
};
