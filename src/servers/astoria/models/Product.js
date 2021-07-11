"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const database_1 = __importDefault(require("../utils/database"));
const DatabaseController_1 = require("../../../models/DatabaseController");
;
class ProductController {
    constructor() {
        this._db = new DatabaseController_1.DatabaseController(database_1.default);
    }
    ;
    createToken(data) {
        return {
            meta: {
                id: data.id,
                slug: data.slug,
            },
            details: {
                type: data.type,
                fit: data.fit,
                style: data.style,
                name: data.name,
                price: parseInt(data.price),
                desc: data.description,
                list: data.list.split(' | ')
            },
            preview: {
                image: {
                    src: data.image,
                    alt: data.name
                },
                link: data.link
            }
        };
    }
    ;
    fetchProducts() {
        return this._db.fetchAll('products');
    }
    ;
    fetchProduct(col, val) {
        return this._db.fetchByColumn('products', col, val);
    }
    ;
}
exports.ProductController = ProductController;
;
//# sourceMappingURL=Product.js.map