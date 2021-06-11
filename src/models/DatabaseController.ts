
import { Pool } from 'mysql2/promise';
import { Combinable } from '../utils/types';
import { getObjVal } from '../helpers/functions';


export interface DatabaseControllerInterface 
{
  delete: (table: string, id: Combinable) => Promise<any>;
  fetchAll: (table: string) => Promise<any>;
  fetchById: (table: string, id: Combinable) => Promise<any>;
  fetchByType: (table: string, type: string) => Promise<any>;
  fetchByColumn: (table: string, column: string, value: string) => Promise<any>;
  create<T>(table: string, rows: string, holder: string, values: T): Promise<any>;
};


class DatabaseController implements DatabaseControllerInterface
{
  private _db: Pool;

  constructor(db: Pool) {
    this._db = db;
  };

  private createPlaceholder(rows: string): string {
    const rowArr: Array<string> = rows.split(/[, ]+/);
    const len: number = rowArr.length;
    let p: string = '?';

    if (len > 1) {
      for(let i = 0; i < len - 1; i++) {
        p = p.concat(' ?');
      }
    }

    return p;
  };
  
  public create<T>(table: string, cols: string, values: T): Promise<any> {
    const ph: string = this.createPlaceholder(cols);
    const val: Array<T[keyof T]> = getObjVal(values);

    return this._db.execute(`INSERT INTO ${table} (${cols}) VALUES (${ph})`, [...val]);
  };

  public delete(table: string, id: Combinable): Promise<any> {
    return this._db.execute(`DROP * FROM ${table} WHERE ${table}.id = ?`, [id]);
  };

  public fetchAll(table: string): Promise<any> {
    return this._db.execute(`SELECT * FROM ${table}`);
  };

  public fetchById(table: string, id: Combinable): Promise<any> {
    return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.id = ?`, [id]);
  };

  public fetchByType(table: string, type: string): Promise<any> {
    return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.type = ?`, [type]);
  };

  public fetchByColumn(table: string, col: string, value: string): Promise<any> {
    return this._db.execute(`SELECT * FROM ${table} WHERE ${table}.${col} = ?`, [value]);
  };


  public update(table: string, id: number, col: string, value: Combinable): Promise<any> {
    return this._db.execute(`UPDATE ${table} SET ${col}=${value} WHERE ${table}.id = ?`, [id]);
  }
};

export { DatabaseController };
