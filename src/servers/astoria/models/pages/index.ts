
import db from '../../utils/database';
import { DatabaseController } from "../../../../models/DatabaseController";
import { IndexPageHeaderData, SqlData } from '../../utils/types';


class IndexPage 
{
  private _headers: IndexPageHeaderData[];
  private _db: DatabaseController;

  constructor() {
    this._headers = [];
    this._db = new DatabaseController(db);
  };

  set headers(h: IndexPageHeaderData[]) 
  {
    this._headers = h;
  };

  public fetchHeaders(): Promise<any>
  {
    return this._db.fetchByType('headers', 'index');
  };


  public createToken()
  {
    const token: IndexPageHeaderData[] = this._headers;

    return token;
  };
};

export { IndexPage };
