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
exports.resolveScryfallResp = exports.fetchAllCards = exports.scrubDeclarationSyntax = exports.getCardDeclarations = exports.isCardDeclaration = void 0;
const scryfall_1 = require("../services/scryfall");
const cardDeclarationRegExp = new RegExp(/(\[\[[\w\s\'\.\,|/:🎲-]+\]\])+/g);
function isCardDeclaration(message) {
    const cardsFound = message.match(cardDeclarationRegExp);
    if (cardsFound !== null && cardsFound.length === 0)
        return false;
    return true;
}
exports.isCardDeclaration = isCardDeclaration;
function getCardDeclarations(message) {
    const matches = message.match(cardDeclarationRegExp);
    if (matches === null)
        return [];
    return matches;
}
exports.getCardDeclarations = getCardDeclarations;
function scrubDeclarationSyntax(declarations) {
    return declarations.map((card) => card.replace('[[', '').replace(']]', ''));
}
exports.scrubDeclarationSyntax = scrubDeclarationSyntax;
function fetchAllCards(cards) {
    return cards.map((name) => (0, scryfall_1.getCardByName)(name));
}
exports.fetchAllCards = fetchAllCards;
function resolveScryfallResp(resp) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, rej) => Promise.all(resp)
            .then((cards) => res(cards.map((card) => card.data)))
            .catch((err) => { console.error(err); rej(err); }));
    });
}
exports.resolveScryfallResp = resolveScryfallResp;
