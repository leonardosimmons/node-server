
import { Pool } from 'mysql2/promise';
import { Combinable } from '../utils/types';

interface DatabaseControllerInterface 
{
  delete: (table: string, id: Combinable) => Promise<any>;
  fetchAll: (table: string) => Promise<any>;
  fetchById: (table: string, id: Combinable) => Promise<any>;
  save: (table: string, rows: string, holder: string, values: any) => Promise<any>;
};


class DatabaseController implements DatabaseControllerInterface
{
  private _db: Pool;

  constructor(db: Pool) {
    this._db = db;
  };

  public delete(table: string, id: Combinable) {
    return this._db.execute(`DROP * FROM ${table} WHERE ${table}._id = ?`, [ id ]);
  };

  public fetchAll(table: string) {
    return this._db.execute(`SELECT * FROM ${table}`);
  };

  public fetchById(table: string, id: Combinable) {
    return this._db.execute(`SELECT * FROM ${table} WHERE ${table}._id = ?`, [ id ]);
  };

  public save<T>(table: string, rows: string, values: T) {
    const rowArr: string[] = rows.split(/[, ]+/);
    const len: number = rowArr.length;
    let placeholder: string = '?';

    if (len > 1) {
      for(let i = 0; i < len - 1; i++) {
        placeholder = placeholder.concat(' ?');
      }
    }

    return this._db.execute(`INSERT INTO ${table} (${rows}) VALUES (${placeholder})`, values);
  };
};

export { DatabaseController };
