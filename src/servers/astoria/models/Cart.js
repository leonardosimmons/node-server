"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const DatabaseController_1 = require("../../../models/DatabaseController");
const keys_1 = require("../utils/keys");
;
class CartController {
    constructor() {
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
    }
    ;
    addProduct(p) {
        const rows = 'id, u_id, prod_id, size, quantity';
        return this._db.create(keys_1.table.CART, rows, p);
    }
    ;
    createToken(u_id, product, order) {
        return {
            user: { id: u_id },
            product,
            order
        };
    }
    ;
    fetchAll() {
        return this._db.fetchAll(keys_1.table.CART);
    }
    ;
    fetchByUser(u_id) {
        return this._db.fetchByColumn(keys_1.table.CART, 'u_id', u_id);
    }
    removeProduct(id) {
        return this._db.delete(keys_1.table.CART, id);
    }
    updateProductQuantity(id, newVal) {
        const col = 'quantity';
        return this._db.update(keys_1.table.CART, id, col, newVal);
    }
    ;
}
exports.CartController = CartController;
;
//# sourceMappingURL=Cart.js.map