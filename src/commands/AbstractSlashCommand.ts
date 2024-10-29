import {
  Interaction,
  InteractionResponse,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export default abstract class AbstractSlashCommand {
  abstract data: SlashCommandOptionsOnlyBuilder;
  abstract exec(
    interaction: Interaction
  ): void | Promise<InteractionResponse<boolean>>;
  abstract toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody;
}
