import { Interaction, Message } from 'discord.js';
import ScryfallCardModel from '../../types/ScryfallCardModel/ScryfallCardModel';

export default abstract class AbstractScryfallCard {
  abstract data: ScryfallCardModel;
  abstract ctx: Message | Interaction;

  constructor(data: ScryfallCardModel, ctx: Message | Interaction) {}

  abstract get frontFace(): string;
  abstract get backFace(): string;
  abstract get name(): string;
  abstract get oracle(): string;
  abstract get uri(): string;
}
