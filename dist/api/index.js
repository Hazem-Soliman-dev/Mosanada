"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const express_1 = require("express");
const serverless_express_1 = require("@codegenie/serverless-express");
let cachedServer;
exports.default = async (req, res) => {
    if (!cachedServer) {
        const expressApp = (0, express_1.default)();
        const nestApp = await (0, main_1.createApp)();
        await nestApp.init();
        const instance = nestApp.getHttpAdapter().getInstance();
        cachedServer = (0, serverless_express_1.default)({ app: instance });
    }
    return cachedServer(req, res);
};
//# sourceMappingURL=index.js.map