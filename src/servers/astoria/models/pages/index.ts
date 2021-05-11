
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

  get data() {
    return {
      headers: this._headers
    };
  }


  public fetchHeaders(): Promise<any> {
    return this._db.fetchByType('headers', 'index');
  };

  public fetchPageData() {
    
  };

  public setHeaders(data: SqlData): void
  {
    if (data instanceof Array && data.length > 0) {
      data.forEach((header: any) => {
        const token = {
          id: header.lineOne,
          heading: header.heading,
          textAbove: header.lineTwo,
          btn: {
            text: header.btnText,
            link: header.btnLink
          },
          video: header.image
        };

        this._headers.push(token);
      });
    }
  };
};

export { IndexPage };
