import { Interaction, Message } from 'discord.js';
import CustomError from './CustomError';

export default class OracleNotFound extends CustomError {
  name: string = 'OracleNotFound';
  context: Message | Interaction;

  constructor(message: string, ctx: Message | Interaction) {
    super(message);
    this.context = ctx;
    Object.setPrototypeOf(this, OracleNotFound.prototype);
  }
}
