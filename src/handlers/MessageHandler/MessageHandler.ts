import { TextBasedChannel } from 'discord.js';
import channelTypes from '../../utils/channel-types';
import AbstractMessageHandler, { Channel } from './AbstractMessageHandler';

export default class MessageHandler extends AbstractMessageHandler {
  channel: TextBasedChannel;
  content: string;

  constructor(channel: TextBasedChannel, content: string = '') {
    super();
    this.channel = channel;
    this.content = content;
  }

  async send(): Promise<void> {
    const type = channelTypes[this.channel.type];
    if (type !== 'PublicThread' && type !== 'GuildText') return;
    if (!this.channel.isTextBased()) return;
    if (!('send' in this.channel)) return;

    await this.channel.send(this.content);
  }
}
