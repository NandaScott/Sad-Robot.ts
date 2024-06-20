"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var discord_js_1 = require("discord.js");
var configs_1 = require("./src/configs");
var services_1 = require("./src/services");
var ClientReady_1 = require("./src/event-listeners/discord/ClientReady");
var intents_1 = require("./src/utils/intents");
var MessageCreate_1 = require("./src/event-listeners/discord/MessageCreate");
var InteractionCreate_1 = require("./src/event-listeners/discord/InteractionCreate");
var scryfallService = new services_1.ScryfallService(configs_1.ScryfallAxios);
var client = new discord_js_1.Client({
    intents: intents_1.default,
});
var ready = new ClientReady_1.default();
client.on(ready.event, function (client) { return ready.exec(client); });
var messageCreate = new MessageCreate_1.default(scryfallService);
client.on(messageCreate.event, function (message) { return messageCreate.exec(message); });
var interactionCreate = new InteractionCreate_1.default(scryfallService);
client.on(interactionCreate.event, function (interaction) {
    return interactionCreate.exec(interaction);
});
client.login(process.env.TOKEN);
