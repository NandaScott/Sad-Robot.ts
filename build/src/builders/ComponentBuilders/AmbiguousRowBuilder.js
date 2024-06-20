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
var AmbiguousRowBuilder = /** @class */ (function (_super) {
    __extends(AmbiguousRowBuilder, _super);
    function AmbiguousRowBuilder() {
        var _this = _super.call(this) || this;
        _this.rowCount = 0;
        _this.maxRows = 1;
        _this.row = new discord_js_1.ActionRowBuilder();
        return _this;
    }
    AmbiguousRowBuilder.prototype.addComponent = function (component) {
        if (this.rowCount === this.maxRows) {
            throw new Error("Maximum component count for this row reached (".concat(this.maxRows, ")"));
        }
        this.rowCount += 1;
        this.row.addComponents(component);
    };
    AmbiguousRowBuilder.prototype.createComponent = function () {
        return this.row;
    };
    return AmbiguousRowBuilder;
}(AbstractComponentBuilder_1.default));
exports.default = AmbiguousRowBuilder;
