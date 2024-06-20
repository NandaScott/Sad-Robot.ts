"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageUriError_1 = require("../../errors/ImageUriError");
var OracleNotFound_1 = require("../../errors/OracleNotFound");
var DoubleFacedScryfallCard = /** @class */ (function () {
    function DoubleFacedScryfallCard(data, ctx) {
        this.data = data;
        this.ctx = ctx;
    }
    Object.defineProperty(DoubleFacedScryfallCard.prototype, "frontFace", {
        get: function () {
            if (!this.data.card_faces) {
                throw new ImageUriError_1.default("No card faces available for ".concat(this.data.name), this.ctx);
            }
            if (!this.data.card_faces[0].image_uris.normal) {
                throw new ImageUriError_1.default("No normal images available for ".concat(this.data.name), this.ctx);
            }
            return this.data.card_faces[0].image_uris.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoubleFacedScryfallCard.prototype, "backFace", {
        get: function () {
            if (!this.data.card_faces) {
                throw new ImageUriError_1.default("No card faces available for ".concat(this.data.name), this.ctx);
            }
            if (!this.data.card_faces[1].image_uris.normal) {
                throw new ImageUriError_1.default("No normal images available for ".concat(this.data.name), this.ctx);
            }
            return this.data.card_faces[1].image_uris.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoubleFacedScryfallCard.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoubleFacedScryfallCard.prototype, "oracle", {
        get: function () {
            if (!this.data.oracle_text) {
                throw new OracleNotFound_1.default("No oracle_text available for ".concat(this.data.name), this.ctx);
            }
            return this.data.oracle_text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoubleFacedScryfallCard.prototype, "uri", {
        get: function () {
            return this.data.scryfall_uri;
        },
        enumerable: false,
        configurable: true
    });
    return DoubleFacedScryfallCard;
}());
exports.default = DoubleFacedScryfallCard;
