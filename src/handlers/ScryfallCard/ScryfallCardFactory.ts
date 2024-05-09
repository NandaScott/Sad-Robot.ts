import DoubleFacedScryfallCard from './DoubleFacedScryfallCard';
import ScryfallCardModel, {
  DoubleFaceLayout,
  MutliFacedCard,
  SingleFaceLayout,
  SingleFacedCard,
} from './ScryfallCardModel';
import SingleFacedScryfallCard from './SingleFacedScryfallCard';

export default class ScryfallCardFactory {
  private data: ScryfallCardModel;

  constructor(data: ScryfallCardModel) {
    this.data = data;
  }

  createCard(): SingleFacedScryfallCard | DoubleFacedScryfallCard {
    if (this.data.layout in singleLayouts) {
      return new SingleFacedScryfallCard(this.data as SingleFacedCard);
    }
    if (this.data.layout in doubleLayouts) {
      return new DoubleFacedScryfallCard(this.data as MutliFacedCard);
    }
    throw new Error(`Layout not found for ${this.data.name}`);
  }
}

const singleLayouts: Record<SingleFaceLayout, true> = {
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
  vanguard: true,
};

const doubleLayouts: Record<DoubleFaceLayout, true> = {
  art_series: true,
  battle: true,
  double_faced_token: true,
  meld: true,
  modal_dfc: true,
  reversible_card: true,
  transform: true,
};
