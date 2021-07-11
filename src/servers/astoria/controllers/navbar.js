"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileData = exports.getDesktopData = void 0;
const desktop_1 = require("../models/navbar/desktop");
const mobile_1 = require("../models/navbar/mobile");
function getDesktopData(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const desktop = new desktop_1.DesktopNavbar();
        try {
            const [data] = yield desktop.fetchData();
            const token = desktop.createToken(data);
            res.status(200).json({
                message: 'Data successfully retrieved from database',
                data: token
            });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.log = 'unable to retrieve desktop navbar data from database';
            next(error);
        }
    });
}
exports.getDesktopData = getDesktopData;
;
function getMobileData(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mobile = new mobile_1.MobileNavbar();
        try {
            const [data] = yield mobile.fetchData();
            const token = mobile.createToken(data);
            res.status(200).json({
                message: 'Data successfully retrieved from database',
                data: token
            });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.log = ('unable to retrieve mobile navbar data from database');
            next(error);
        }
    });
}
exports.getMobileData = getMobileData;
;
//# sourceMappingURL=navbar.js.map