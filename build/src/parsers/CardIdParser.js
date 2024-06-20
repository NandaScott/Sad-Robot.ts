"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardIdParser = /** @class */ (function () {
    function CardIdParser() {
    }
    CardIdParser.parse = function (input) {
        // prettier-ignore
        var uuid = /[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}/g;
        return input.match(uuid);
    };
    return CardIdParser;
}());
exports.default = CardIdParser;
