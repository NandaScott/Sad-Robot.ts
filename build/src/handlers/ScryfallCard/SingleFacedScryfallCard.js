"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageUriError_1 = require("../../errors/ImageUriError");
var OracleNotFound_1 = require("../../errors/OracleNotFound");
var SingleFacedScryfallCard = /** @class */ (function () {
    function SingleFacedScryfallCard(data, ctx) {
        this.data = data;
        this.ctx = ctx;
    }
    Object.defineProperty(SingleFacedScryfallCard.prototype, "frontFace", {
        get: function () {
            if (!this.data.image_uris) {
                throw new ImageUriError_1.default("No images available for ".concat(this.data.name), this.ctx);
            }
            if (!this.data.image_uris.normal) {
                throw new ImageUriError_1.default("No normal images available for ".concat(this.data.name), this.ctx);
            }
            return this.data.image_uris.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleFacedScryfallCard.prototype, "backFace", {
        get: function () {
            if (!this.data.image_uris) {
                throw new ImageUriError_1.default("No images available for ".concat(this.data.name), this.ctx);
            }
            if (!this.data.image_uris.normal) {
                throw new ImageUriError_1.default("No normal images available for ".concat(this.data.name), this.ctx);
            }
            return this.data.image_uris.normal;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleFacedScryfallCard.prototype, "name", {
        get: function () {
            return this.data.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleFacedScryfallCard.prototype, "oracle", {
        get: function () {
            if (!this.data.oracle_text) {
                throw new OracleNotFound_1.default("No oracle_text available for ".concat(this.data.name), this.ctx);
            }
            return this.data.oracle_text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SingleFacedScryfallCard.prototype, "uri", {
        get: function () {
            return this.data.scryfall_uri;
        },
        enumerable: false,
        configurable: true
    });
    return SingleFacedScryfallCard;
}());
exports.default = SingleFacedScryfallCard;
