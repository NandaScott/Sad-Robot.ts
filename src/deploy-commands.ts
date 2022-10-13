import { REST, Routes } from "discord.js";
import CommandManager from "./command-manager";

const comman = new CommandManager()

export default function deploy() {
  const cmds = [...comman.commands].map(command => command.data.toJSON())

  if (!process.env.TOKEN) {
    throw new Error('You need a bot token.')
  }

  if (!process.env.CLIENT_ID) {
    throw new Error('You need a client ID.')
  }

  console.log(`Attempting to register ${comman.commands.length} application commands.`)

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: cmds })
    .then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error)
}