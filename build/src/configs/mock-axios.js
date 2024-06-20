"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var blackhole = axios_1.default.create({
    baseURL: '192.0.2.0', // black hole address (https://datatracker.ietf.org/doc/html/rfc5737 for more info.)
});
blackhole.interceptors.response.use(function (config) {
    return config;
}, function (error) { } // We don't want the error to be logged.
);
exports.default = blackhole;
