"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Basic delay function to make delays easy.
 * @param ms delay in miliseconds
 * @returns A promise that resolves after N miliseconds
 */
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.default = delay;
