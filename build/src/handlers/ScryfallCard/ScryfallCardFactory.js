"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DoubleFacedScryfallCard_1 = require("./DoubleFacedScryfallCard");
var SingleFacedScryfallCard_1 = require("./SingleFacedScryfallCard");
var LayoutNotFound_1 = require("../../errors/LayoutNotFound");
var ScryfallCardFactory = /** @class */ (function () {
    function ScryfallCardFactory(data, ctx) {
        this.data = data;
        this.context = ctx;
    }
    ScryfallCardFactory.prototype.isSingleFacedCard = function (data) {
        return data.layout in singleLayouts;
    };
    ScryfallCardFactory.prototype.isMultiFacedCard = function (data) {
        return data.layout in doubleLayouts;
    };
    ScryfallCardFactory.prototype.createCard = function () {
        if (this.isSingleFacedCard(this.data)) {
            return new SingleFacedScryfallCard_1.default(this.data, this.context);
        }
        if (this.isMultiFacedCard(this.data)) {
            return new DoubleFacedScryfallCard_1.default(this.data, this.context);
        }
        throw new LayoutNotFound_1.default('Layout not found.', this.context);
    };
    return ScryfallCardFactory;
}());
exports.default = ScryfallCardFactory;
var singleLayouts = {
    adventure: true,
    augment: true,
    case: true,
    class: true,
    emblem: true,
    flip: true,
    host: true,
    leveler: true,
    mutate: true,
    normal: true,
    planar: true,
    prototype: true,
    saga: true,
    scheme: true,
    split: true,
    token: true,
    vanguard: true,
};
var doubleLayouts = {
    art_series: true,
    battle: true,
    double_faced_token: true,
    meld: true,
    modal_dfc: true,
    reversible_card: true,
    transform: true,
};
