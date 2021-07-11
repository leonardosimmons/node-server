"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const functions_1 = require("../helpers/functions");
;
class DatabaseController {
    constructor(db) {
        this._db = db;
    }
    ;
    createPlaceholder(rows) {
        const rowArr = rows.split(/[, ]+/);
        const len = rowArr.length;
        let p = '?';
        if (len > 1) {
            for (let i = 0; i < len - 1; i++) {
                p = p.concat(', ?');
            }
        }
        return p;
    }
    ;
    create(table, cols, values) {
        const ph = this.createPlaceholder(cols);
        const val = functions_1.getObjVal(values);
        return this._db.execute(`INSERT INTO ${table} (${cols}) VALUES (${ph})`, val);
    }
    ;
    createTable(name, cols) {
        return this._db.execute(`CREATE TABLE IF NOT EXISTS ${name} (${cols})`);
    }
    ;
    delete(table, id) {
        return this._db.execute(`DELETE FROM ${table} WHERE ${table}.id = ?`, [id]);
    }
    ;
    fetchAll(table) {
        return this._db.execute(`SELECT * FROM ${table}`);
    }
    ;
    fetchById(table, id) {
        return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.id = ?`, [id]);
    }
    ;
    fetchByType(table, type) {
        return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.type = ?`, [type]);
    }
    ;
    fetchByColumn(table, col, value) {
        return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.${col} = ?`, [value]);
    }
    ;
    update(table, id, col, value) {
        return this._db.execute(`UPDATE ${table} SET ${col}=${value} WHERE ${table}.id = ?`, [id]);
    }
}
exports.DatabaseController = DatabaseController;
;
//# sourceMappingURL=DatabaseController.js.map