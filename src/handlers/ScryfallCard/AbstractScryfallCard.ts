import { CustomScryfallConfig } from '../../../axios';
import ScryfallCardModel from '../../types/ScryfallCardModel/ScryfallCardModel';

export default abstract class AbstractScryfallCard {
  abstract data: ScryfallCardModel;
  abstract ctx: CustomScryfallConfig['ctx'];

  constructor(data: ScryfallCardModel, ctx: CustomScryfallConfig['ctx']) {}

  abstract get image(): string;
  abstract get name(): string;
  abstract get oracle(): string;
  abstract get uri(): string;
}
