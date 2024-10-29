import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import AbstractSlashCommand from './AbstractSlashCommand';

export default class SlashCommandHandler {
  rest: REST;
  token: string = process.env.TOKEN ?? '';
  appId: string = process.env.APP_ID ?? '';
  commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  constructor() {
    this.rest = new REST().setToken(this.token);
  }

  registerCommand(Command: new (...args: any[]) => AbstractSlashCommand) {
    this.commands.push(new Command().toJSON());
  }

  async sendRequest(): Promise<void> {
    try {
      console.log(
        `Started refreshing ${this.commands.length} application (/) commands.`
      );

      const data: any = await this.rest.put(
        Routes.applicationCommands(this.appId),
        { body: this.commands }
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
