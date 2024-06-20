"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var SuccessButtonBuilder_1 = require("../../builders/ComponentBuilders/SuccessButtonBuilder");
var chunk_array_1 = require("../../utils/chunk-array");
var SuccessRowBuilder_1 = require("../../builders/ComponentBuilders/SuccessRowBuilder");
var SuccessfulResponseBuilder = /** @class */ (function () {
    function SuccessfulResponseBuilder(responses) {
        this.response = responses.successful;
        this.data = [];
        this.initialRows();
        this.buildChunks();
        this.buildRows();
    }
    SuccessfulResponseBuilder.prototype.isSingleDimensionArray = function (array) {
        return array.every(function (item) { return !Array.isArray(item); });
    };
    SuccessfulResponseBuilder.prototype.isMultidimensionalArray = function (array) {
        return array.every(function (item) { return Array.isArray(item); });
    };
    SuccessfulResponseBuilder.prototype.isActionRowBuilderArray = function (data) {
        return data.every(function (item) {
            return item instanceof discord_js_1.ActionRowBuilder &&
                item.components.every(function (component) { return component instanceof discord_js_1.ButtonBuilder; });
        });
    };
    SuccessfulResponseBuilder.prototype.initialRows = function () {
        this.data = this.response.map(function (_a) {
            var scryfall = _a.scryfall;
            return new SuccessButtonBuilder_1.default(scryfall.name, scryfall.id);
        });
    };
    SuccessfulResponseBuilder.prototype.buildChunks = function () {
        if (!this.isSingleDimensionArray(this.data)) {
            throw new Error();
        }
        this.data = (0, chunk_array_1.default)(this.data, 4);
    };
    SuccessfulResponseBuilder.prototype.buildRows = function () {
        if (!this.isMultidimensionalArray(this.data)) {
            throw new Error();
        }
        this.data = this.data.map(function (chunk) {
            var row = new SuccessRowBuilder_1.default();
            chunk.forEach(function (builder) { return row.addComponent(builder.createComponent()); });
            return row.createComponent();
        });
    };
    SuccessfulResponseBuilder.prototype.createSuccessRows = function () {
        if (!this.isActionRowBuilderArray(this.data)) {
            throw new Error();
        }
        return this.data;
    };
    return SuccessfulResponseBuilder;
}());
exports.default = SuccessfulResponseBuilder;
