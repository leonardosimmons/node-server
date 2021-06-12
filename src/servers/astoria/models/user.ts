
import db from '../utils/database';
import { DatabaseController } from '../../../models/DatabaseController';
import { NewUserToken, User, UserTableData } from '../utils/types';
import { Combinable } from '../../../utils/types';
import { table } from '../utils/keys';
import { randNum } from '../../../helpers/functions';


interface UserControllerInterface {
  createToken: (values: UserTableData) => User;
  create: (values: NewUserToken) => void;
  delete: (id: Combinable) => Promise<any>;
  fetchAll: () => Promise<any>;
  fetch: (col: string, val: string) => Promise<any>;
  generateId: () => Promise<number>;
  save: (rows: string, values: UserTableData) => void;
  update: (id: number, col: string, val: Combinable) => Promise<any>;
};


class UserController implements UserControllerInterface
{
  private _db: DatabaseController;
  private _minRange: number;
  private _maxRange: number

  constructor() {
    this._db = new DatabaseController(db);
    this._minRange = 100000000;
    this._maxRange = 999999999;
  };

  public createToken(u: UserTableData): User {
    return {
      id: u.id,
      info: {
        name: u.name,
        email: u.email,
        image: u.image
      }
    };
  };

  public create(values: NewUserToken): void {
    const rows: string = 'id, name, email, image';
    this._db.create(table.users, rows, values);
  };

  public delete(id: Combinable): Promise<any> {
    return this._db.delete(table.users, id);
  };

  public fetchAll(): Promise<any> {
    return this._db.fetchAll(table.users);
  };

  public fetch(col: string, val: string): Promise<any> {
    return this._db.fetchByColumn(table.users, col, val);
  };

  public async generateId(): Promise<number> {
    let uD: Array<UserTableData> = [];
    let id: number = randNum(this._minRange, this._maxRange);
  
    const [ data ] = await this.fetchAll();
    uD = data.map((uD: UserTableData) => uD);

    const unqie: boolean = uD.some((user: UserTableData) => {
      return user.id !== id
    });

    if (unqie) {
      return id
    }

    id = await this.generateId() as number;

    return id;
  };

  public save(rows: string, values: UserTableData): void {
    this._db.create(table.users, rows, values);
  }

  public update(id: number, col: string, val: Combinable): Promise<any> {
    return this._db.update(table.users, id, col, val);
  }
};

export { UserController };
