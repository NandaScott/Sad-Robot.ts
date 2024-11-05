import DoubleFacedScryfallCard from "./DoubleFacedScryfallCard.js";
import SingleFacedScryfallCard from "./SingleFacedScryfallCard.js";
import LayoutNotFound from "../../errors/LayoutNotFound.js";
export default class ScryfallCardFactory {
  constructor(data, ctx) {
    this.data = data;
    this.context = ctx;
  }
  isSingleFacedCard(data) {
    return data.layout in singleLayouts;
  }
  isMultiFacedCard(data) {
    return data.layout in doubleLayouts;
  }
  createCard() {
    if (this.isSingleFacedCard(this.data)) {
      return new SingleFacedScryfallCard(this.data, this.context);
    }
    if (this.isMultiFacedCard(this.data)) {
      return new DoubleFacedScryfallCard(this.data, this.context);
    }
    throw new LayoutNotFound('Layout not found.', this.context);
  }
}
const singleLayouts = {
  adventure: true,
  augment: true,
  case: true,
  class: true,
  emblem: true,
  flip: true,
  host: true,
  leveler: true,
  mutate: true,
  normal: true,
  planar: true,
  prototype: true,
  saga: true,
  scheme: true,
  split: true,
  token: true,
  vanguard: true
};
const doubleLayouts = {
  art_series: true,
  battle: true,
  double_faced_token: true,
  meld: true,
  modal_dfc: true,
  reversible_card: true,
  transform: true
};