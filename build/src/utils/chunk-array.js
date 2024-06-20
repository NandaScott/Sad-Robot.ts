"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunkArray(array, chunkSize) {
    if (chunkSize <= 0) {
        throw new Error('Chunk size must be a positive integer');
    }
    var result = [];
    for (var i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}
exports.default = chunkArray;
