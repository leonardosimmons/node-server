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
exports.getProduct = exports.getAllProducts = void 0;
const Product_1 = require("../models/Product");
function getAllProducts(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let prod = [];
            const ctrl = new Product_1.ProductController();
            const [data] = yield ctrl.fetchProducts();
            prod = data.map((p) => (ctrl.createToken(p)));
            res.status(200).json({ message: 'Success', payload: prod });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.message = 'unable to retrieve products from database';
            next(error);
        }
    });
}
exports.getAllProducts = getAllProducts;
;
function getProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let prod = [];
            const ctrl = new Product_1.ProductController();
            const loc = req.query.loc;
            const val = req.query.val;
            const [data] = yield ctrl.fetchProduct(loc, val);
            prod = data.map((p) => (ctrl.createToken(p)));
            res.status(200).json({ message: 'Success', payload: prod });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.message = 'Unable to retrieve product data from database';
            next(error);
        }
    });
}
exports.getProduct = getProduct;
;
//# sourceMappingURL=products.js.map