"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var SuccessRowBuilder_1 = require("../../builders/ComponentBuilders/SuccessRowBuilder");
var SuccessButtonBuilder_1 = require("../../builders/ComponentBuilders/SuccessButtonBuilder");
var SuccessRows = /** @class */ (function () {
    function SuccessRows() {
    }
    SuccessRows.handleSuccessRows = function (interaction) {
        var selectedValue = interaction.values[0];
        var buttonRows = interaction.message.components
            // Capture only button rows
            .filter(function (row) {
            return row.components.every(function (comp) { return comp.type === discord_js_1.ComponentType.Button; });
        });
        var successRows = buttonRows.length === 0 // Check to see if any button rows exist
            ? [new SuccessRowBuilder_1.default()] // If they don't create a single row builder
            : buttonRows // Otherwise, work with the rows we have.
                // Transform component data into data for row builder
                .map(function (row) {
                return row.components.map(function (comp) { return (__assign(__assign({}, comp.data), { customId: comp.customId })); });
            })
                // Create a new set of row builders, and rebuild the button components
                .map(function (rowData) {
                var row = new SuccessRowBuilder_1.default();
                rowData.forEach(function (compData) {
                    if (compData.type === discord_js_1.ComponentType.Button) {
                        if (!compData.label)
                            throw new Error(); // TODO
                        if (!compData.customId)
                            throw new Error(); // TODO
                        var cardId = compData.customId.split(':').pop();
                        if (!cardId)
                            throw new Error(); // TODO
                        var button = new SuccessButtonBuilder_1.default(compData.label, cardId);
                        row.addComponent(button.createComponent());
                    }
                });
                return row;
            });
        var lastSuccessRow = successRows.every(function (row) { return row.row.components.length === 4; })
            ? new SuccessRowBuilder_1.default()
            : successRows.pop();
        if (lastSuccessRow instanceof SuccessRowBuilder_1.default) {
            var newButton = new SuccessButtonBuilder_1.default(selectedValue, selectedValue);
            lastSuccessRow.addComponent(newButton.createComponent());
        }
        if (lastSuccessRow !== undefined) {
            successRows.push(lastSuccessRow);
        }
        return successRows.map(function (row) { return row.createComponent(); });
    };
    return SuccessRows;
}());
exports.default = SuccessRows;
