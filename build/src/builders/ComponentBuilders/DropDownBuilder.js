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
var DropDownBuilder = /** @class */ (function (_super) {
    __extends(DropDownBuilder, _super);
    function DropDownBuilder(placeholder, options) {
        var _this = _super.call(this) || this;
        _this.type = 'Dropdown';
        _this.options = [];
        _this.placeholder = placeholder;
        _this.dropdownId = [_this.type, Math.random()].join(':');
        // Mock network call to autocomplete
        _this.options = options.map(function (opt) { return new discord_js_1.StringSelectMenuOptionBuilder({ label: opt, value: opt }); });
        return _this;
    }
    DropDownBuilder.prototype.createComponent = function () {
        return new discord_js_1.StringSelectMenuBuilder({
            customId: this.dropdownId,
            placeholder: this.placeholder,
        }).setOptions(this.options);
    };
    return DropDownBuilder;
}(AbstractComponentBuilder_1.default));
exports.default = DropDownBuilder;
