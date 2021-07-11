"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexPage = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const DatabaseController_1 = require("../../../../models/DatabaseController");
class IndexPage {
    constructor() {
        this._headers = [];
        this._staticData = {};
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
    }
    ;
    get data() {
        return {
            headers: this._headers,
            staticData: this._staticData
        };
    }
    fetchHeaders() {
        return this._db.fetchByType('headers', 'index');
    }
    ;
    fetchPageData() {
        return this._db.fetchAll('index_page');
    }
    ;
    setHeaders(data) {
        if (data instanceof Array && data.length > 0) {
            data.forEach((header) => {
                const token = {
                    id: header.lineOne,
                    heading: header.heading,
                    textAbove: header.lineTwo,
                    btn: {
                        text: header.btnText,
                        link: header.btnLink
                    },
                    video: header.image
                };
                this._headers.push(token);
            });
        }
    }
    ;
}
exports.IndexPage = IndexPage;
;
//# sourceMappingURL=index.js.map