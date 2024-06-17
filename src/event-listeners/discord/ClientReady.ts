import { Client, ClientEvents, Events } from 'discord.js';
import AbstractEventListener from '../AbstractEventListener';

export default class ClientReady extends AbstractEventListener<
  ClientEvents,
  Events.ClientReady
> {
  event: Events.ClientReady = Events.ClientReady;

  constructor() {
    super();
  }

  async exec(client: Client<true>): Promise<void> {
    if (!client.isReady()) throw new Error('Failed to ready');

    console.log(`Logged in as ${client.user.tag}`);
  }
}
