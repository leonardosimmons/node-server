"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const definitions_1 = require("../helpers/definitions");
const router = express_1.default.Router();
router.use('/favicon.ico', (_, res, next) => {
    res.status(204);
});
router.use((error, _, res) => {
    console.log(definitions_1.consoleText.red, `[error] ${error.log ? error.log : error.message}`);
    const status = error.statusCode;
    const message = error.message;
    const log = error.log;
    if (log) {
        res.status(status).json({
            message: message,
            log: log
        });
    }
    else {
        res.status(status).json({
            message: message
        });
    }
});
exports.default = router;
//# sourceMappingURL=error.js.map