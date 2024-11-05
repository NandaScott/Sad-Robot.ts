import { REST, Routes } from 'discord.js';
export default class SlashCommandHandler {
  token = process.env.TOKEN ?? '';
  appId = process.env.APP_ID ?? '';
  commands = [];
  constructor() {
    this.rest = new REST().setToken(this.token);
  }
  registerCommand(Command) {
    this.commands.push(new Command().toJSON());
  }
  async sendRequest() {
    try {
      console.log(`Started refreshing ${this.commands.length} application (/) commands.`);
      const data = await this.rest.put(Routes.applicationCommands(this.appId), {
        body: this.commands
      });
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  }
}