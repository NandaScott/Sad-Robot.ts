"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripProps = void 0;
function stripProps(data) {
    const card = JSON.parse(data);
    return normalizeCard(card);
}
exports.stripProps = stripProps;
const normalizeCard = (card) => {
    const handlers = {
        normal: handleSingleFace,
        split: handleSingleFace,
        flip: handleSingleFace,
        transform: handleDoubleFace,
        modal_dfc: handleDoubleFace,
        meld: handleSingleFace,
        leveler: handleSingleFace,
        class: handleSingleFace,
        saga: handleSingleFace,
        adventure: handleSingleFace,
        planar: handleSingleFace,
        scheme: handleSingleFace,
        vanguard: handleSingleFace,
        token: handleSingleFace,
        double_faced_token: handleDoubleFace,
        emblem: handleSingleFace,
        augment: handleSingleFace,
        host: handleSingleFace,
        art_series: handleSingleFace,
        reversible_card: handleDoubleFace
    };
    const func = handlers[card.layout];
    return func(card);
};
const handleSingleFace = (card) => [
    {
        id: card.id,
        image_uris: card.image_uris,
        layout: card.layout,
        name: card.name,
        scryfall_uri: card.scryfall_uri
    }
];
const handleDoubleFace = (card) => {
    const { card_faces } = card;
    if (!card_faces)
        return [];
    return card_faces === null || card_faces === void 0 ? void 0 : card_faces.map((face) => ({
        id: card.id,
        layout: card.layout,
        name: card.name,
        scryfall_uri: card.scryfall_uri,
        image_uris: face.image_uris
    }));
};
