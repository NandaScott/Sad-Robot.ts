"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_manager_1 = __importDefault(require("./command-manager"));
const comman = new command_manager_1.default();
function deploy() {
    const cmds = [...comman.commands].map(command => command.data.toJSON());
    if (!process.env.TOKEN) {
        throw new Error('You need a bot token.');
    }
    if (!process.env.CLIENT_ID) {
        throw new Error('You need a client ID.');
    }
    console.log(`Attempting to register ${comman.commands.length} application commands.`);
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.TOKEN);
    rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), { body: cmds })
        .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);
}
exports.default = deploy;
