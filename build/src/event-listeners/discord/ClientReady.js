import { Events } from 'discord.js';
import AbstractEventListener from "../AbstractEventListener.js";
export default class ClientReady extends AbstractEventListener {
  event = Events.ClientReady;
  constructor() {
    super();
  }
  async exec(client) {
    if (!client.isReady()) throw new Error('Failed to ready');
    console.log(`Logged in as ${client.user.tag}`);
  }
}