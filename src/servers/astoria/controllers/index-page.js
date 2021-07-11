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
exports.getData = void 0;
const pages_1 = require("../models/pages");
function getData(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const indexPage = new pages_1.IndexPage();
        try {
            const [headerData] = yield indexPage.fetchHeaders();
            indexPage.setHeaders(headerData);
            res.status(200).json({
                message: 'Data successfully retrieved from database',
                data: indexPage.data
            });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.log = 'unable to retrieve desktop navbar data from database';
            next(err);
        }
    });
}
exports.getData = getData;
;
//# sourceMappingURL=index-page.js.map