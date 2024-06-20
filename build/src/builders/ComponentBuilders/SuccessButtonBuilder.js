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
var AbstractComponentBuilder_1 = require("./AbstractComponentBuilder");
var SuccessButtonBuilder = /** @class */ (function (_super) {
    __extends(SuccessButtonBuilder, _super);
    function SuccessButtonBuilder(label, metadata) {
        var _this = _super.call(this) || this;
        _this.type = 'Success';
        _this.style = discord_js_1.ButtonStyle.Success;
        _this.label = label;
        _this.buttonId = [_this.type, Math.random(), metadata].join(':');
        return _this;
    }
    SuccessButtonBuilder.prototype.createComponent = function () {
        return new discord_js_1.ButtonBuilder()
            .setLabel(this.label)
            .setCustomId(this.buttonId)
            .setStyle(this.style);
    };
    return SuccessButtonBuilder;
}(AbstractComponentBuilder_1.default));
exports.default = SuccessButtonBuilder;
