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
exports.signOut = exports.signIn = exports.getAll = exports.getUser = exports.add = void 0;
const user_1 = require("../models/user");
const functions_1 = require("../../../helpers/functions");
function add(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error');
                return;
            }
            const cntrl = new user_1.UserController();
            const name = req.body.name;
            const email = req.body.email;
            const image = req.body.image;
            yield cntrl.generateId()
                .then((n) => {
                const id = n;
                if (name) {
                    const newUser = { id, name, email, image };
                    cntrl.create(newUser);
                    return newUser;
                }
            })
                .then((user) => {
                res.status(201).json({
                    message: 'User successfully added to the database',
                    payload: {
                        id: user === null || user === void 0 ? void 0 : user.id,
                        info: {
                            name: user === null || user === void 0 ? void 0 : user.name,
                            email: user === null || user === void 0 ? void 0 : user.email,
                            image: user === null || user === void 0 ? void 0 : user.image
                        }
                    }
                });
            })
                .catch(err => { throw new Error(err); });
        }
        catch (err) {
            const msg = 'Unable to add user to database';
            next(functions_1.httpError(err, msg));
        }
        ;
    });
}
exports.add = add;
;
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = [];
        const cntrl = new user_1.UserController();
        const loc = req.query.loc;
        const val = req.query.val;
        try {
            const [data] = yield cntrl.fetch(loc, val);
            const user = data.map((u) => (cntrl.createToken(u)));
            res.status(200).json({ message: 'Success', payload: user });
        }
        catch (err) {
            const msg = 'Unable to retrieve user from database';
            next(functions_1.httpError(err, msg));
        }
    });
}
exports.getUser = getUser;
;
function getAll(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = [];
            const cntrl = new user_1.UserController();
            const [data] = yield cntrl.fetchAll();
            users = data.map((u) => ({
                id: u.id,
                info: {
                    name: u.name,
                    email: u.email,
                    image: u.image
                }
            }));
            res.status(200).json({
                message: 'Success',
                payload: users
            });
        }
        catch (err) {
            const msg = 'Unable to retrieve users from database';
            next(functions_1.httpError(err, msg));
        }
    });
}
exports.getAll = getAll;
;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error');
                return;
            }
            const cntrl = new user_1.UserController();
            const u_id = req.body.u_id;
            const col = 'signed_in';
            yield cntrl.update(parseInt(u_id), col, 1);
            const token = functions_1.generateAccessToken({ u_id }, '12h');
            res.status(200).json({
                message: 'Success',
                payload: {
                    u_id,
                    token,
                    signedIn: true
                }
            });
        }
        catch (err) {
            const msg = 'Unable to sign in user';
            next(functions_1.httpError(err, msg));
        }
    });
}
exports.signIn = signIn;
;
function signOut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body) {
                res.statusCode = 404;
                res.end('Error');
                return;
            }
            const cntrl = new user_1.UserController();
            const id = req.body.u_id;
            const col = 'signed_in';
            yield cntrl.update(parseInt(id), col, 0);
            res.status(200).json({
                message: 'success',
                payload: true
            });
        }
        catch (err) {
            const msg = 'Unable to sign out user';
            next(functions_1.httpError(err, msg));
        }
    });
}
exports.signOut = signOut;
//# sourceMappingURL=user.js.map