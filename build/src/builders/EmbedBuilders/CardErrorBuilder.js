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
var CardErrorBuilder = /** @class */ (function (_super) {
    __extends(CardErrorBuilder, _super);
    function CardErrorBuilder(error) {
        var _this = _super.call(this) || this;
        _this.error = error;
        return _this;
    }
    CardErrorBuilder.prototype.create = function () {
        var embed = new discord_js_1.EmbedBuilder({
            color: discord_js_1.Colors.Red,
            title: this.error,
        }).data;
        return [embed];
    };
    return CardErrorBuilder;
}(AbstractEmbedBuilder_1.default));
exports.default = CardErrorBuilder;
