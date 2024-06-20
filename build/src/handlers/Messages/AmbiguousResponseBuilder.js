"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var DropDownBuilder_1 = require("../../builders/ComponentBuilders/DropDownBuilder");
var AmbiguousRowBuilder_1 = require("../../builders/ComponentBuilders/AmbiguousRowBuilder");
var AmbiguousResponseBuilder = /** @class */ (function () {
    function AmbiguousResponseBuilder(responses) {
        this.response = responses.failed;
        this.data = [];
        this.initialRows();
        this.buildDropDownRows();
        this.buildActionRows();
    }
    AmbiguousResponseBuilder.prototype.isScryfallResponseErrorArray = function (data) {
        return data.every(function (item) { return 'object' in item && item.object === 'error'; });
    };
    AmbiguousResponseBuilder.prototype.isDropDownBuilderArray = function (data) {
        return data.every(function (item) { return item instanceof DropDownBuilder_1.default; });
    };
    AmbiguousResponseBuilder.prototype.isActionRowBuilderArray = function (data) {
        return data.every(function (item) {
            return item instanceof discord_js_1.ActionRowBuilder &&
                item.components.every(function (component) { return component instanceof discord_js_1.StringSelectMenuBuilder; });
        });
    };
    AmbiguousResponseBuilder.prototype.initialRows = function () {
        this.data = this.response
            .filter(function (_a) {
            var scryfall = _a.scryfall;
            return scryfall.type === 'ambiguous';
        })
            .map(function (_a) {
            var scryfall = _a.scryfall;
            var keyword = scryfall.details.match(/“(.*)”/gm);
            scryfall.details = "Options for ".concat(keyword);
            return scryfall;
        });
    };
    AmbiguousResponseBuilder.prototype.buildDropDownRows = function () {
        if (!this.isScryfallResponseErrorArray(this.data)) {
            throw new Error();
        }
        this.data = this.data.map(function (_a) {
            var details = _a.details, autocomplete = _a.autocomplete;
            return new DropDownBuilder_1.default(details, autocomplete !== null && autocomplete !== void 0 ? autocomplete : []);
        });
    };
    AmbiguousResponseBuilder.prototype.buildActionRows = function () {
        if (!this.isDropDownBuilderArray(this.data)) {
            throw new Error();
        }
        this.data = this.data.map(function (builder) {
            var row = new AmbiguousRowBuilder_1.default();
            row.addComponent(builder.createComponent());
            return row.createComponent();
        });
    };
    AmbiguousResponseBuilder.prototype.createAmbiguousRows = function () {
        if (!this.isActionRowBuilderArray(this.data)) {
            throw new Error();
        }
        return this.data;
    };
    return AmbiguousResponseBuilder;
}());
exports.default = AmbiguousResponseBuilder;
