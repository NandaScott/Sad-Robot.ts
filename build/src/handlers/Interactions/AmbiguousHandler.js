"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var AmbiguousRowBuilder_1 = require("../../builders/ComponentBuilders/AmbiguousRowBuilder");
var DropDownBuilder_1 = require("../../builders/ComponentBuilders/DropDownBuilder");
var AmbiguousHandler = /** @class */ (function () {
    function AmbiguousHandler() {
    }
    AmbiguousHandler.handleAmbiguousRows = function (interaction) {
        return (interaction.message.components
            // Capture only dropdown rows
            .filter(function (row) {
            return row.components[0].data.type === discord_js_1.ComponentType.StringSelect &&
                row.components[0].customId !== interaction.customId;
        })
            .map(function (rowData) {
            var compData = rowData.components[0];
            if (compData.placeholder === null)
                throw new Error();
            var row = new AmbiguousRowBuilder_1.default();
            var options = compData.options.map(function (opt) { return opt.label; });
            var dropdown = new DropDownBuilder_1.default(compData.placeholder, options);
            row.addComponent(dropdown.createComponent());
            return row.createComponent();
        }));
    };
    return AmbiguousHandler;
}());
exports.default = AmbiguousHandler;
