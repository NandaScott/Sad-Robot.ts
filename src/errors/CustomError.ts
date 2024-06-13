import { Interaction, Message } from 'discord.js';

export default abstract class CustomError extends Error {
  abstract name: string;
  abstract context: Message | Interaction;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
