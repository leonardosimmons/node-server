"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    database: process.env.DB_ASTORIA,
    password: process.env.DB_PASSWORD
});
exports.default = pool.promise();
//# sourceMappingURL=database.js.map