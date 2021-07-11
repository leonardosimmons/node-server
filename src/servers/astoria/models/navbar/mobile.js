"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileNavbar = void 0;
const DatabaseController_1 = require("../../../../models/DatabaseController");
const database_1 = __importDefault(require("../../utils/database"));
class MobileNavbar {
    constructor() {
        this._icons = [];
        this._tabs = [];
        this._scrollText = [];
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
    }
    ;
    sort(data) {
        if (data instanceof Array && data.length > 1) {
            data.forEach((element) => {
                switch (element.type) {
                    case 'icons':
                        this._icons.push(element);
                        break;
                    case 'tabs':
                        this._tabs.push(element);
                        break;
                    case 'scroll':
                        this._scrollText.push(element.name);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    ;
    fetchData() { return this._db.fetchAll('mobile_navbar'); }
    ;
    createToken(data) {
        this.sort(data);
        const token = {
            icons: this._icons,
            menu: {
                tabs: this._tabs,
                scrollText: this._scrollText
            }
        };
        return token;
    }
}
exports.MobileNavbar = MobileNavbar;
;
//# sourceMappingURL=mobile.js.map