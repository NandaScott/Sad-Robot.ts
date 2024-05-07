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
    await this.channel.send(this.content);
  }
}