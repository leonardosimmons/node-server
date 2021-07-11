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
exports.updateProductQuantity = exports.removeProductFromCart = exports.getUserCart = exports.addProductToCart = void 0;
const Product_1 = require("../models/Product");
const Cart_1 = require("../models/Cart");
const functions_1 = require("../../../helpers/functions");
function addProductToCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error');
                return;
            }
            const cntrl = new Cart_1.CartController();
            const min = 100000000;
            const max = 999999999;
            let buffer;
            const r = {
                u_id: res.locals.u_id,
                prod_id: req.body.prod_id,
                size: req.body.size,
                quantity: req.body.quantity
            };
            const [data] = yield cntrl.fetchAll();
            yield data.forEach((p) => {
                if (p.u_id === r.u_id && p.prod_id === r.prod_id && p.size === r.size) {
                    buffer = p;
                }
            });
            if (!buffer) {
                const token = {
                    id: functions_1.randNum(min, max),
                    u_id: r.u_id,
                    prod_id: r.prod_id,
                    size: r.size,
                    quantity: r.quantity
                };
                if (token.u_id !== undefined) {
                    cntrl.addProduct(token);
                }
            }
            if (buffer) {
                const newVal = parseInt(buffer.quantity) + parseInt(r.quantity);
                if (newVal !== undefined) {
                    cntrl.updateProductQuantity(buffer.id, newVal);
                }
            }
            res.status(200).json({
                message: 'Success',
                payload: true
            });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.message = 'Unable to add product to cart';
            next(error);
        }
    });
}
exports.addProductToCart = addProductToCart;
;
function getUserCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = [];
        let buffer = [];
        let userCart = [];
        const u_id = res.locals.u_id;
        const cartCntrl = new Cart_1.CartController();
        const prodCntrl = new Product_1.ProductController();
        try {
            const [cartData] = yield cartCntrl.fetchByUser(parseInt(u_id));
            const [prodData] = yield prodCntrl.fetchProducts();
            // matches each prod_id with full product info
            cartData.map((c) => {
                prodData.map((p) => {
                    if (parseInt(p.id) === c.prod_id) {
                        const token = prodCntrl.createToken(p);
                        products.push(token);
                    }
                });
            });
            // Creates user's cart
            cartData.map((c) => {
                products.map((p) => {
                    if (parseInt(p.meta.id) === c.prod_id) {
                        const token = cartCntrl.createToken(parseInt(u_id), p, { id: c.id, size: c.size, quantity: parseInt(c.quantity) });
                        buffer.push(token);
                    }
                });
            });
            // removes any duplicates
            userCart = buffer.reduce((unique, p) => {
                if (!unique.some((obj) => obj.order.id === p.order.id)) {
                    unique.push(p);
                }
                return unique;
            }, []);
            res.status(200).json({
                message: 'Success',
                payload: userCart
            });
        }
        catch (err) {
            const error = err;
            error.statusCode = 502;
            error.message = 'Unable to retrieve the user\'s cart';
            next(error);
        }
    });
}
exports.getUserCart = getUserCart;
;
function removeProductFromCart(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.query.order_id;
        const cntrl = new Cart_1.CartController();
        try {
            yield cntrl.removeProduct(parseInt(id));
            res.status(200).json({ message: 'Product successfully removed' });
        }
        catch (err) {
            const msg = 'Unable to remove product from cart';
            next(functions_1.httpError(err, msg));
        }
    });
}
exports.removeProductFromCart = removeProductFromCart;
;
function updateProductQuantity(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body) {
            res.statusCode = 404;
            res.end('Error');
            return;
        }
        const i = req.body.id;
        const q = req.body.quantity;
        const cntrl = new Cart_1.CartController();
        try {
            if (i && q) {
                yield cntrl.updateProductQuantity(i, q);
            }
        }
        catch (err) {
            const msg = 'Unable to update product quantity.';
            next(functions_1.httpError(err, msg));
        }
        res.status(200).json({
            message: 'Success'
        });
    });
}
exports.updateProductQuantity = updateProductQuantity;
;
//# sourceMappingURL=cart.js.map