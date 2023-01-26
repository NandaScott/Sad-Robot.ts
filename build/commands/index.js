"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_slash_1 = __importDefault(require("./basic-slash"));
const slash_w_options_1 = __importDefault(require("./slash-w-options"));
const buttons_1 = __importDefault(require("./buttons"));
const select_1 = __importDefault(require("./select"));
exports.default = [
    basic_slash_1.default,
    slash_w_options_1.default,
    buttons_1.default,
    select_1.default
];
