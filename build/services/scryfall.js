"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRulings = exports.getRandom = exports.getCardById = exports.getCardByCodeNumber = exports.getCardAutocomplete = exports.getCardNameCatalog = exports.getCardByName = void 0;
const axios_1 = __importDefault(require("axios"));
const request_transformers_1 = require("./request-transformers");
const addStartTime = (config) => {
    const startTime = new Date().getTime();
    config.params.timeData = { startTime };
    return config;
};
const addTimeData = (response) => {
    const endTime = new Date().getTime();
    const startTime = response.config.params.timeData.startTime;
    const duration = endTime - startTime;
    response.config.params.timeData.endTime = endTime;
    response.config.params.timeData.duration = duration;
    response.config.params.timeData.calc = parseFloat(((duration / 1000) % 60).toString());
    return response;
};
const handleError = (error) => Promise.reject(error);
const scryfall = axios_1.default.create({
    baseURL: 'https://api.scryfall.com',
    params: {}
});
scryfall.interceptors.request.use(addStartTime, handleError);
scryfall.interceptors.response.use(addTimeData, handleError);
const strippedScryfall = axios_1.default.create({
    baseURL: 'https://api.scryfall.com',
    params: {},
    transformResponse: [
        request_transformers_1.stripProps
    ]
});
strippedScryfall.interceptors.request.use(addStartTime, handleError);
strippedScryfall.interceptors.response.use(addTimeData, handleError);
function getCardByName(name, set) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            fuzzy: name,
            set
        };
        return scryfall.get('/cards/named', { params })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getCardByName = getCardByName;
function getCardNameCatalog() {
    return __awaiter(this, void 0, void 0, function* () {
        return scryfall.get('/catalog/card-names')
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getCardNameCatalog = getCardNameCatalog;
function getCardAutocomplete(cardName) {
    return __awaiter(this, void 0, void 0, function* () {
        return scryfall.get('/cards/autocomplete', { params: { q: cardName, include_extras: true } })
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getCardAutocomplete = getCardAutocomplete;
function getCardByCodeNumber(code, number) {
    return __awaiter(this, void 0, void 0, function* () {
        return scryfall.get(`/cards/${code}/${number}/en`)
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getCardByCodeNumber = getCardByCodeNumber;
function getCardById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return strippedScryfall.get(`/cards/${id}`)
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getCardById = getCardById;
function getRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        return scryfall.get('/cards/random')
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getRandom = getRandom;
function getRulings(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        return scryfall.get(`/cards/${cardId}/rulings`)
            .catch((err) => {
            console.log(err);
            throw err;
        });
    });
}
exports.getRulings = getRulings;
;
