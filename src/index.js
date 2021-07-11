"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const definitions_1 = require("./helpers/definitions");
const headers_1 = __importDefault(require("./routes/headers"));
const error_1 = __importDefault(require("./routes/error"));
const router_1 = __importDefault(require("./test/router"));
const router_2 = __importDefault(require("./servers/astoria/router"));
const router_3 = __importDefault(require("./servers/portfolio/router"));
const { PORT, DEV_PORT } = process.env;
const server = express_1.default();
const SERVER_PORT = PORT || DEV_PORT;
/* ---------------------  PARSERS  -------------------- */
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
/* ---------------------  ROUTES  --------------------- */
server.use(headers_1.default);
server.use('/portfolio', router_3.default);
server.use('/astoria', router_2.default);
server.use('/test', router_1.default);
server.use(error_1.default);
/* ---------------------  SERVER  --------------------- */
server.listen(SERVER_PORT, () => {
    console.log(definitions_1.consoleText.magenta, `[server] server is listening on port ${SERVER_PORT}`);
});
//# sourceMappingURL=index.js.map