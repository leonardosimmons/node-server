
import db from '../../../../utils/database';
import { DatabaseController } from '../../../../models/DatabaseController';

import { MobileNavbarInterface } from '../../utils/interfaces';
import { MobileNavbarData, NavbarToken, SqlData } from '../../utils/types';


class MobileNavbar implements MobileNavbarInterface
{
  private _icons: NavbarToken[];
  private _tabs: NavbarToken[];
  private _scrollText: string[];
  private _db: DatabaseController;

  constructor()
  {
    this._icons = [];
    this._tabs = [];
    this._scrollText = [];
    this._db = new DatabaseController(db);
  };

  private sort(data: SqlData) {
    if (data instanceof Array && data.length > 1) {
      data.forEach((element: any) => {
        switch(element.type) {
          case 'icons':
            this._icons.push(element);
            break;
          case 'tabs':
            this._tabs.push(element);
            break;
          case 'scroll':
            this._scrollText.push(element.name);
            break;
          default:
            break;
        }
      });
    }
  };

  public fetchData(): Promise<any> { return this._db.fetchAll('mobile_navbar'); };

  public createToken(data: SqlData): MobileNavbarData
  {
    this.sort(data);

    const token: MobileNavbarData = {
      icons: this._icons,
      menu: {
        tabs: this._tabs,
        scrollText: this._scrollText
      }
    };

    return token;
  }
};

export { MobileNavbar };
