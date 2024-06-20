"use strict";
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
var CardErrorBuilder_1 = require("../../builders/EmbedBuilders/CardErrorBuilder");
var ErrorsResponseBuilder = /** @class */ (function () {
    function ErrorsResponseBuilder(responses) {
        this.response = responses.failed;
        this.data = [];
        this.initialRows();
    }
    ErrorsResponseBuilder.prototype.initialRows = function () {
        this.data = this.response
            .filter(function (_a) {
            var scryfall = _a.scryfall;
            return scryfall.code === 'not_found' && scryfall.type !== 'ambiguous';
        })
            .map(function (_a) {
            var scryfall = _a.scryfall;
            return scryfall;
        });
    };
    ErrorsResponseBuilder.prototype.createEmbeds = function () {
        return this.data
            .map(function (_a) {
            var details = _a.details;
            var errorEmbed = new CardErrorBuilder_1.default(details);
            return errorEmbed.create();
        })
            .reduce(function (prev, curr) { return __spreadArray(__spreadArray([], prev, true), curr, true); }, []);
    };
    return ErrorsResponseBuilder;
}());
exports.default = ErrorsResponseBuilder;
