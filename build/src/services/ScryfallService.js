"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractHTTPService_1 = require("./AbstractHTTPService");
var ScryfallService = /** @class */ (function (_super) {
    __extends(ScryfallService, _super);
    function ScryfallService(axios) {
        var _this = _super.call(this) || this;
        _this.axios = axios;
        return _this;
    }
    ScryfallService.prototype.isAxiosScryfallError = function (err) {
        return 'isAxiosError' in err && err.isAxiosError;
    };
    ScryfallService.prototype.getById = function (ctx, id) {
        return __awaiter(this, void 0, void 0, function () {
            var card, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.axios.get("/cards/".concat(id), { ctx: ctx })];
                    case 1:
                        card = _a.sent();
                        return [2 /*return*/, [card, null]];
                    case 2:
                        err_1 = _a.sent();
                        if (!this.isAxiosScryfallError(err_1))
                            throw err_1;
                        return [2 /*return*/, [null, err_1]];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScryfallService.prototype.getCard = function (ctx, name, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var card, err_2, _a, axiosData, status_1;
            var _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this.axios.get('/cards/named', {
                                params: (_b = {}, _b[mode !== null && mode !== void 0 ? mode : 'fuzzy'] = name, _b),
                                ctx: ctx,
                            })];
                    case 1:
                        card = _d.sent();
                        return [2 /*return*/, [card, null]];
                    case 2:
                        err_2 = _d.sent();
                        if (!this.isAxiosScryfallError(err_2))
                            throw err_2;
                        if (!(((_c = err_2.response) === null || _c === void 0 ? void 0 : _c.data.scryfall.type) === 'ambiguous')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.axios.get('/cards/autocomplete', {
                                params: { q: name },
                            })];
                    case 3:
                        _a = _d.sent(), axiosData = _a.data, status_1 = _a.status;
                        if (status_1 >= 400)
                            throw new Error('Autocomplete failed');
                        err_2.response.data.scryfall.autocomplete = axiosData.scryfall.data;
                        _d.label = 4;
                    case 4: return [2 /*return*/, [null, err_2]];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ScryfallService.allSettled = function (cards) {
        return __awaiter(this, void 0, void 0, function () {
            var responses, successful, failed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.allSettled(cards).then(function (value) {
                            return value
                                .filter(function (result) {
                                return result.status === 'fulfilled';
                            })
                                .map(function (_a) {
                                var value = _a.value;
                                return value;
                            });
                        })];
                    case 1:
                        responses = _a.sent();
                        successful = responses
                            .map(function (val) { return val[0]; })
                            .filter(function (val) { return val !== null; })
                            .map(function (_a) {
                            var data = _a.data;
                            return data;
                        });
                        failed = responses
                            .map(function (val) { return val[1]; })
                            .filter(function (val) { return val !== null; })
                            .map(function (val) {
                            var _a;
                            if (!((_a = val.response) === null || _a === void 0 ? void 0 : _a.data))
                                throw new Error('No data from Scryfall');
                            return val.response.data;
                        });
                        return [2 /*return*/, {
                                successful: successful,
                                failed: failed,
                            }];
                }
            });
        });
    };
    return ScryfallService;
}(AbstractHTTPService_1.default));
exports.default = ScryfallService;
