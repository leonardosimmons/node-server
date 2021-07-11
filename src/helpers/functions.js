"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = exports.removeDuplicateByVal = exports.randNum = exports.preg_match = exports.httpError = exports.generateRandHash = exports.generateAccessToken = exports.getObjVal = void 0;
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;
/**
 * returns an array of the values contained within the given object
 * @param obj
 * @returns
 */
function getObjVal(obj) {
    let k;
    let v = [];
    for (k in obj) {
        if (obj[k]) {
            v.push(obj[k]);
        }
        else {
            v.push(null);
        }
    }
    return v;
}
exports.getObjVal = getObjVal;
;
/**
 * Generates a JSON Web Token
 * @param username
 */
function generateAccessToken(data, expires) {
    return jwt.sign(Object.assign({}, data), TOKEN_SECRET, { expiresIn: expires });
}
exports.generateAccessToken = generateAccessToken;
;
/**
 * Generates and returns a hashed string
 * @param bytes
 * @returns
 */
function generateRandHash(bytes) {
    return require('crypto').randomBytes(bytes ? bytes : 64).toString('hex');
}
exports.generateRandHash = generateRandHash;
;
function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
}
/**
 * Handles http errors
 * @param err
 * @param msg
 * @returns
 */
function httpError(err, msg) {
    const error = err;
    error.statusCode = 502;
    error.message = msg ? msg : 'Something went wrong';
    return error;
}
exports.httpError = httpError;
;
/**
 * Checks the given regular expression against the given parameter
 * @param regex - regular expression
 * @param s - string or number to be checked
 */
function preg_match(regex, c) {
    if (typeof c === 'string')
        return (new RegExp(regex).test(c));
    if (typeof c === 'number')
        return (new RegExp(regex).test(c.toString()));
}
exports.preg_match = preg_match;
;
/**
 *  Generates a random number within the specified range
 * @param min
 * @param max
 * @returns
 */
function randNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.randNum = randNum;
;
function removeDuplicateByVal(arr, val) {
    return arr.reduce((unique, o) => {
        if (!unique.some((obj) => obj.order.id === o.order.id)) {
            unique.push(o);
        }
        return unique;
    }, []);
}
exports.removeDuplicateByVal = removeDuplicateByVal;
;
function removeDuplicates(arr) {
    let seen = {};
    let ret_arr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}
exports.removeDuplicates = removeDuplicates;
;
//# sourceMappingURL=functions.js.map