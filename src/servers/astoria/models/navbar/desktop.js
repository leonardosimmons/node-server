"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesktopNavbar = void 0;
const database_1 = __importDefault(require("../../utils/database"));
const DatabaseController_1 = require("../../../../models/DatabaseController");
class DesktopNavbar {
    constructor() {
        this._info = [];
        this._logo = { name: '', link: '' };
        this._tabs = [];
        this._profiles = [];
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
    }
    ;
    sort(data) {
        if (data instanceof Array && data.length > 0) {
            data.forEach((element) => {
                switch (element.type) {
                    case 'info':
                        this._info.push(element);
                        break;
                    case 'logo':
                        this._logo = element;
                        break;
                    case 'tabs':
                        this._tabs.push(element);
                        break;
                    case 'profile':
                        this._profiles.push(element);
                        break;
                    default:
                        break;
                }
            });
        }
    }
    ;
    fetchData() { return this._db.fetchAll('desktop_navbar'); }
    ;
    createToken(data) {
        this.sort(data);
        const token = {
            info: this._info,
            menu: {
                logo: this._logo,
                tabs: this._tabs
            },
            profiles: this._profiles
        };
        return token;
    }
    ;
}
exports.DesktopNavbar = DesktopNavbar;
;
//# sourceMappingURL=desktop.js.map