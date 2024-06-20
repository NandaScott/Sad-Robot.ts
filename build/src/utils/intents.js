"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var intents = [
    discord_js_1.GatewayIntentBits.Guilds, // Required for Guild interaction
    discord_js_1.GatewayIntentBits.GuildMessages, // Required to listen for messages
    discord_js_1.GatewayIntentBits.MessageContent, // Required to read message contents
    discord_js_1.GatewayIntentBits.DirectMessages, // Required to send emphemeral messages
];
exports.default = intents;
