"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryfallAxios = exports.MockAxios = void 0;
var mock_axios_1 = require("./mock-axios");
Object.defineProperty(exports, "MockAxios", { enumerable: true, get: function () { return mock_axios_1.default; } });
var scryfall_axios_1 = require("./scryfall-axios");
Object.defineProperty(exports, "ScryfallAxios", { enumerable: true, get: function () { return scryfall_axios_1.default; } });
