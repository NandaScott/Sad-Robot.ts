import ScryfallCardModel from './ScryfallCardModel';

export default abstract class AbstractScryfallCard {
  abstract data: ScryfallCardModel;

  abstract get image(): string;
  abstract get name(): string;
  abstract get oracle(): string;
  abstract get uri(): string;
}
