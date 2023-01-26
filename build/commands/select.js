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
const discord_js_1 = require("discord.js");
const select = new discord_js_1.SlashCommandBuilder()
    .setName('select')
    .setDescription('Example of a select menu');
// Possible use for a card error
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions({
        label: 'Select me',
        description: 'This is a description',
        value: 'first_option',
    }, {
        label: 'You can select me too',
        description: 'This is also a description',
        value: 'second_option',
    }));
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setDescription('Some description here');
    yield interaction.reply({ content: 'Select an option', ephemeral: true, embeds: [embed], components: [row] });
});
exports.default = {
    data: select,
    execute
};
