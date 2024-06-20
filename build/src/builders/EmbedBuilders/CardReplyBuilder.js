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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var AbstractEmbedBuilder_1 = require("./AbstractEmbedBuilder");
var DoubleFacedScryfallCard_1 = require("../../handlers/ScryfallCard/DoubleFacedScryfallCard");
var CardReplyBuilder = /** @class */ (function (_super) {
    __extends(CardReplyBuilder, _super);
    function CardReplyBuilder(handler) {
        var _this = _super.call(this) || this;
        _this.handler = handler;
        return _this;
    }
    CardReplyBuilder.prototype.create = function () {
        if (this.handler instanceof DoubleFacedScryfallCard_1.default) {
            var face1 = new discord_js_1.EmbedBuilder()
                .setColor(discord_js_1.Colors.Blue)
                .setTitle(this.handler.name)
                .setImage(this.handler.frontFace)
                .setURL(this.handler.uri).data;
            var face2 = new discord_js_1.EmbedBuilder()
                .setColor(discord_js_1.Colors.Blue)
                .setTitle(this.handler.name)
                .setImage(this.handler.backFace)
                .setURL(this.handler.uri).data;
            return [face1, face2];
        }
        var embed = new discord_js_1.EmbedBuilder()
            .setColor(discord_js_1.Colors.Blue)
            .setTitle(this.handler.name)
            .setImage(this.handler.frontFace)
            .setURL(this.handler.uri).data;
        return [embed];
    };
    return CardReplyBuilder;
}(AbstractEmbedBuilder_1.default));
exports.default = CardReplyBuilder;
