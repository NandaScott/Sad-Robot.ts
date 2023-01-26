"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const buttons = new discord_js_1.SlashCommandBuilder()
    .setName('buttons')
    .setDescription('Example of buttons');
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new builders_1.ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle(discord_js_1.ButtonStyle.Primary), new builders_1.ButtonBuilder()
        .setCustomId('secondary')
        .setLabel('Secondary')
        .setStyle(discord_js_1.ButtonStyle.Secondary), new builders_1.ButtonBuilder()
        .setCustomId('success')
        .setLabel('Success')
        .setStyle(discord_js_1.ButtonStyle.Success), new builders_1.ButtonBuilder()
        .setCustomId('danger')
        .setLabel('Danger')
        .setStyle(discord_js_1.ButtonStyle.Danger), new builders_1.ButtonBuilder()
        .setURL('https://google.com')
        .setLabel('Link')
        .setStyle(discord_js_1.ButtonStyle.Link));
    yield interaction.reply({ content: 'I think you should', components: [row] });
});
exports.default = {
    data: buttons,
    execute
};
