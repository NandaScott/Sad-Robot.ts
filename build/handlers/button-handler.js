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
const scryfall_1 = require("../services/scryfall");
function buttonHandler(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: scryfall, config } = yield (0, scryfall_1.getCardById)(interaction.customId);
        const { timeData } = config.params;
        const embeds = scryfall.map((card) => createEmbed(card, timeData.calc));
        interaction.reply({ embeds, ephemeral: true });
    });
}
exports.default = buttonHandler;
function createEmbed(card, timer) {
    return new builders_1.EmbedBuilder()
        .setTitle(`**${card.name}**`)
        .setURL(card.scryfall_uri)
        .setImage(card.image_uris.normal)
        .setFooter({ text: `Fetch took: ${timer} seconds.` })
        .setColor(0x1b6f9);
}
