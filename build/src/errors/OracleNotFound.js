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
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError_1 = require("./CustomError");
var OracleNotFound = /** @class */ (function (_super) {
    __extends(OracleNotFound, _super);
    function OracleNotFound(message, ctx) {
        var _this = _super.call(this, message) || this;
        _this.name = 'OracleNotFound';
        _this.context = ctx;
        Object.setPrototypeOf(_this, OracleNotFound.prototype);
        return _this;
    }
    return OracleNotFound;
}(CustomError_1.default));
exports.default = OracleNotFound;
