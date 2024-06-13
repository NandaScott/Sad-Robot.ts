import { Interaction, Message } from 'discord.js';
import CustomError from './CustomError';

export default class LayoutNotFound extends CustomError {
  name: string = 'LayoutNotFound';
  context: Message | Interaction;

  constructor(message: string, ctx: Message | Interaction) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, LayoutNotFound.prototype);
  }
}
