"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var AbstractEventListener_1 = require("../AbstractEventListener");
var CardIdParser_1 = require("../../parsers/CardIdParser");
var ScryfallCardFactory_1 = require("../../handlers/ScryfallCard/ScryfallCardFactory");
var CardReplyBuilder_1 = require("../../builders/EmbedBuilders/CardReplyBuilder");
var SuccessRows_1 = require("../../handlers/Interactions/SuccessRows");
var AmbiguousHandler_1 = require("../../handlers/Interactions/AmbiguousHandler");
var HypergeoCommand_1 = require("../../commands/HypergeoCommand");
var InteractionCreate = /** @class */ (function (_super) {
    __extends(InteractionCreate, _super);
    function InteractionCreate(scryfallService) {
        var _this = _super.call(this) || this;
        _this.event = discord_js_1.Events.InteractionCreate;
        _this.scryfallService = scryfallService;
        return _this;
    }
    InteractionCreate.prototype.exec = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, type, rng, idOrName, getData, _b, card, error, cardHandler, embeds, successRows, dropdownRows;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!interaction.isButton()) return [3 /*break*/, 3];
                        _a = interaction.customId.split(':'), type = _a[0], rng = _a[1], idOrName = _a[2];
                        getData = CardIdParser_1.default.parse(idOrName)
                            ? this.scryfallService.getById(interaction, idOrName)
                            : this.scryfallService.getCard(interaction, idOrName);
                        return [4 /*yield*/, getData];
                    case 1:
                        _b = _c.sent(), card = _b[0], error = _b[1];
                        if (error)
                            throw new Error();
                        cardHandler = new ScryfallCardFactory_1.default(card.data.scryfall, interaction).createCard();
                        embeds = new CardReplyBuilder_1.default(cardHandler).create();
                        return [4 /*yield*/, interaction.reply({ embeds: embeds, ephemeral: true })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!interaction.isStringSelectMenu()) return [3 /*break*/, 5];
                        successRows = SuccessRows_1.default.handleSuccessRows(interaction);
                        dropdownRows = AmbiguousHandler_1.default.handleAmbiguousRows(interaction);
                        return [4 /*yield*/, interaction.update({
                                components: __spreadArray(__spreadArray([], successRows, true), dropdownRows, true),
                            })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        if (interaction.isChatInputCommand()) {
                            if (interaction.commandName === 'hypergeo') {
                                new HypergeoCommand_1.default().exec(interaction);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return InteractionCreate;
}(AbstractEventListener_1.default));
exports.default = InteractionCreate;
