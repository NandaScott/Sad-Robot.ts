import { Interaction, Message } from 'discord.js';
import CustomError from './CustomError';

export default class ImageUriError extends CustomError {
  name: string = 'ImageUriError';
  context: Message | Interaction;

  constructor(message: string, ctx: Message | Interaction) {
    super(message);
    this.context = ctx;

    Object.setPrototypeOf(this, ImageUriError.prototype);
  }
}
