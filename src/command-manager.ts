import commands from './commands'

type CommandConfig = { [K in keyof typeof commands[number]]: typeof commands[number][K] }

type CommandMap = { [K in typeof commands[number]['data']['name']]: CommandConfig }

export default class CommandManager {

  commands: typeof commands = commands;
  private commandMap: CommandMap;

  constructor() {
    this.commandMap = commands
      .map((val) => ({ [val.data.name]: val })) // convert to objects with command name as top level property
      .reduce((prev, curr) => ({ ...prev, ...curr }), {}) as unknown as CommandMap // collapse array into single object
  }

  get<Name extends keyof CommandMap>(name: Name) {
    return this.commandMap[name];
  }
}