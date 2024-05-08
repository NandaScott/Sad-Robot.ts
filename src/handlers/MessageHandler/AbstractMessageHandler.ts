import { GuildTextBasedChannel, TextBasedChannel } from "discord.js";

export type Channel = GuildTextBasedChannel | TextBasedChannel;

export default abstract class AbstractMessageHandler {
  abstract channel: Channel;
  abstract content: string;

  abstract send(): Promise<void>;
}