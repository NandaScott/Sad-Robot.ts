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
const server = new discord_js_1.SlashCommandBuilder()
    .setName('options')
    .setDescription('Replies with your input')
    .addStringOption(option => option.setName('input')
    .setDescription('The input to echo back')
    .addChoices({ name: 'Funny', value: 'gif_funny' }, { name: 'Meme', value: 'gif_meme' }, { name: 'Movie', value: 'gif_movie' })
    .setRequired(true));
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield interaction.reply(interaction.options.getString('input'));
});
exports.default = {
    data: server,
    execute
};
