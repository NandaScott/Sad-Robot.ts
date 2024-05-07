import channelTypes from "../utils/channel-types";
import AbstractMessageHandler, { Channel } from "./AbstractMessageHandler";

export default class MessageHandler extends AbstractMessageHandler {
  channel: Channel;
  content: string;

  constructor(channel: Channel, content: string = '') {
    super();
    this.channel = channel;
    this.content = content;
  }

  async send(): Promise<void> {
    const type = channelTypes[this.channel.type];
    if (type !== 'PublicThread' && type !== 'GuildText') return;

    await this.channel.send(this.content);
  }
}