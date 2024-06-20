"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardNameParser = /** @class */ (function () {
    function CardNameParser() {
    }
    CardNameParser.parse = function (input) {
        var _a;
        // prettier-ignore
        var doubleBrackets = /\[\[(.*?)\]\]/g;
        var matches = ((_a = input.match(doubleBrackets)) === null || _a === void 0 ? void 0 : _a.map(function (match) { return match.slice(2, -2); })) || [];
        return matches;
    };
    return CardNameParser;
}());
exports.default = CardNameParser;
