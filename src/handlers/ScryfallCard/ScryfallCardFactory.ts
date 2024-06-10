import DoubleFacedScryfallCard from './DoubleFacedScryfallCard';
import ScryfallCardModel, {
  DoubleFaceLayout,
  MutliFacedCard,
  SingleFaceLayout,
  SingleFacedCard,
} from '../../types/ScryfallCardModel/ScryfallCardModel';
import SingleFacedScryfallCard from './SingleFacedScryfallCard';
import { CustomScryfallConfig } from '../../../axios';
import LayoutNotFound from '../../errors/LayoutNotFound';

export default class ScryfallCardFactory {
  private data: ScryfallCardModel;
  private context: CustomScryfallConfig['ctx'];

  constructor(data: ScryfallCardModel, ctx: CustomScryfallConfig['ctx']) {
    this.data = data;
    this.context = ctx;
  }

  isSingleFacedCard(data: typeof this.data): data is SingleFacedCard {
    return data.layout in singleLayouts;
  }

  isMultiFacedCard(data: typeof this.data): data is MutliFacedCard {
    return data.layout in doubleLayouts;
  }

  createCard(): SingleFacedScryfallCard | DoubleFacedScryfallCard {
    if (this.isSingleFacedCard(this.data)) {
      return new SingleFacedScryfallCard(this.data, this.context);
    }

    if (this.isMultiFacedCard(this.data)) {
      return new DoubleFacedScryfallCard(this.data, this.context);
    }

    throw new LayoutNotFound('Layout not found.', this.context);
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
