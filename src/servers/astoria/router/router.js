"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const navbar_1 = __importDefault(require("./routes/navbar"));
const index_page_1 = __importDefault(require("./routes/index-page"));
const products_1 = __importDefault(require("./routes/products"));
const cart_1 = __importDefault(require("./routes/cart"));
const router = express_1.default.Router();
router.use('/cart', cart_1.default);
router.use('/index', index_page_1.default);
router.use('/navbar', navbar_1.default);
router.use('/product', products_1.default);
router.use('/user', user_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map