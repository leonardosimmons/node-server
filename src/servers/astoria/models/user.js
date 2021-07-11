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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const DatabaseController_1 = require("../../../models/DatabaseController");
const keys_1 = require("../utils/keys");
const functions_1 = require("../../../helpers/functions");
;
class UserController {
    constructor() {
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
        this._minRange = 100000000;
        this._maxRange = 999999999;
        this._current = {};
    }
    ;
    get current() {
        return this._current;
    }
    ;
    set current(u) {
        var _a, _b, _c;
        this._current = {
            id: u.id,
            info: {
                name: (_a = u.info) === null || _a === void 0 ? void 0 : _a.name,
                email: (_b = u.info) === null || _b === void 0 ? void 0 : _b.email,
                image: (_c = u.info) === null || _c === void 0 ? void 0 : _c.image
            },
            status: {
                isError: false,
                isSignedIn: true
            }
        };
    }
    ;
    createToken(u) {
        return {
            id: u.id,
            info: {
                name: u.name,
                email: u.email,
                image: u.image
            }
        };
    }
    ;
    create(values) {
        const rows = 'id, name, email, image';
        this._db.create(keys_1.table.USERS, rows, values);
    }
    ;
    delete(id) {
        return this._db.delete(keys_1.table.USERS, id);
    }
    ;
    fetchAll() {
        return this._db.fetchAll(keys_1.table.USERS);
    }
    ;
    fetch(col, val) {
        return this._db.fetchByColumn(keys_1.table.USERS, col, val);
    }
    ;
    generateId() {
        return __awaiter(this, void 0, void 0, function* () {
            let uD = [];
            let id = functions_1.randNum(this._minRange, this._maxRange);
            const [data] = yield this.fetchAll();
            uD = data.map((uD) => uD);
            const unqie = uD.some((user) => {
                return user.id !== id;
            });
            if (unqie) {
                return id;
            }
            id = (yield this.generateId());
            return id;
        });
    }
    ;
    save(rows, values) {
        this._db.create(keys_1.table.USERS, rows, values);
    }
    ;
    signIn() {
        this._current.status.isSignedIn = true;
    }
    ;
    signOut() {
        this._current.status.isSignedIn = false;
    }
    ;
    update(id, col, val) {
        return this._db.update(keys_1.table.USERS, id, col, val);
    }
    ;
}
exports.UserController = UserController;
;
//# sourceMappingURL=user.js.map