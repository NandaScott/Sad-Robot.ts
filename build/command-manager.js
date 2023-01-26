"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = __importDefault(require("./commands"));
class CommandManager {
    constructor() {
        this.commands = commands_1.default;
        this.commandMap = commands_1.default
            .map((val) => ({ [val.data.name]: val })) // convert to objects with command name as top level property
            .reduce((prev, curr) => (Object.assign(Object.assign({}, prev), curr)), {}); // collapse array into single object
    }
    get(name) {
        return this.commandMap[name];
    }
}
exports.default = CommandManager;
