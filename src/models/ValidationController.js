"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController = void 0;
const functions_1 = require("../helpers/functions");
;
class ValidationController {
    constructor() {
        this._validated = false;
        this._error = '';
    }
    ;
    get isValidated() {
        return this._validated;
    }
    get error() {
        return this._error;
    }
    // Controllers
    validate() {
        this._validated = true;
    }
    ;
    lenCheck(field, len) {
        return field.length > len ? true : false;
    }
    check(a = '', b = '', c = '', d = '', e = '', f = '', g = '', h = '', i = '') {
        let fail = '';
        const checkArr = [a, b, c, d, e, f, g, h, i];
        checkArr.forEach(check => {
            if (check !== '') {
                if (fail !== '') {
                    fail = fail.concat(' | ').concat(check);
                }
                else {
                    fail = check;
                }
                if (fail.match(/\s\|\s.*\s\|\s/)) {
                    fail = fail.replace(' | ', '');
                }
            }
        });
        return fail;
    }
    ;
    // Functions
    title(field, len) {
        let fail = '';
        if (field === '') {
            fail = 'No title was entered';
        }
        if (!this.lenCheck(field, len)) {
            fail = fail + 'Title must be at least (5) characters long';
        }
        return fail;
    }
    ;
    content(field, len) {
        let fail = '';
        if (field === '') {
            fail = 'No contetn was entered';
        }
        if (!this.lenCheck(field, len)) {
            fail = fail + 'Content must be at least (5) characters long';
        }
        return fail;
    }
    ;
    firstname(field) {
        return field === '' ? 'No First Name was entered | ' : '';
    }
    ;
    lastname(field) {
        return field === '' ? 'No Last Name was entered | ' : '';
    }
    ;
    username(field) {
        if (field === '')
            return 'No Username entered. | ';
        else if (field.length < 5)
            return 'Usename must be at least 5 characters long. | ';
        else if (functions_1.preg_match('\W', field))
            return 'Username must only contain letters, numbers, _ and -. | ';
        return '';
    }
    ;
    password(field) {
        if (field === '')
            return 'No Password entered | ';
        else if (field.length < 6)
            return 'Password must be at least 6 characters long | ';
        else if (!functions_1.preg_match('[a-z]', field) || !functions_1.preg_match('[A-Z]', field) || !functions_1.preg_match('[0-9]', field))
            return 'Passwords require at least (1) uppercase letter, (1) lowercase letter and (1) number | ';
        return '';
    }
    ;
    age(field) {
        if (field === '' || field === 0)
            return 'No Age was entered | ';
        else if (typeof field === 'string') {
            if (parseInt(field) < 21) {
                return 'You must be at least 21 years of age to enter | ';
            }
        }
        else if (field < 21)
            return 'You must be at least 21 years of age to enter | ';
        return '';
    }
    email(field) {
        if (field === '')
            return 'No Email address was entered | ';
        else if (!(field.indexOf('.') > 0 || field.indexOf('@') > 0) && functions_1.preg_match('[^a-zA-z0-9_-]', field))
            return 'The entered email address is invalid | ';
        return '';
    }
}
exports.ValidationController = ValidationController;
;
//# sourceMappingURL=ValidationController.js.map