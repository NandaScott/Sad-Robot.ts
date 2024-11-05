import channelTypes from "../../utils/channel-types.js";
import AbstractMessageHandler from "./AbstractMessageHandler.js";
export default class MessageHandler extends AbstractMessageHandler {
  constructor(channel, content = '') {
    super();
    this.channel = channel;
    this.content = content;
  }
  async send() {
    const type = channelTypes[this.channel.type];
    if (type !== 'PublicThread' && type !== 'GuildText') return;
    if (!this.channel.isTextBased()) return;
    if (!('send' in this.channel)) return;
    await this.channel.send(this.content);
  }
}