
import db from '../utils/database';
import { DatabaseController } from '../../../models/DatabaseController';
import { NewUserToken, User, UserContext, UserTableData } from '../utils/types';
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
  signIn: () => void;
  signOut: () => void;
  update: (id: number, col: string, val: Combinable) => Promise<any>;
};


class UserController implements UserControllerInterface
{
  private _db: DatabaseController;
  private _minRange: number;
  private _maxRange: number;
  private _current: UserContext;

  constructor() {
    this._db = new DatabaseController(db);
    this._minRange = 100000000;
    this._maxRange = 999999999;
    this._current = <UserContext>{};
  };

  get current() {
    return this._current;
  };

  set current(u: Partial<UserContext>) {
    this._current = {
      id: u.id as number,
      info: {
        name: u.info?.name as string,
        email: u.info?.email,
        image: u.info?.image
      },
      status: {
        isError: false,
        isSignedIn: true
      }
    };
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
    this._db.create(table.USERS, rows, values);
  };

  public delete(id: Combinable): Promise<any> {
    return this._db.delete(table.USERS, id);
  };

  public fetchAll(): Promise<any> {
    return this._db.fetchAll(table.USERS);
  };

  public fetch(col: string, val: string): Promise<any> {
    return this._db.fetchByColumn(table.USERS, col, val);
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
    this._db.create(table.USERS, rows, values);
  };

  public signIn() {
    this._current.status.isSignedIn = true;
  };

  public signOut() {
    this._current.status.isSignedIn = false;
  };

  public update(id: number, col: string, val: Combinable): Promise<any> {
    return this._db.update(table.USERS, id, col, val);
  };
};

export { UserController };
