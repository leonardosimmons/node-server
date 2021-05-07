
import db from '../../utils/database';

import { DesktopNavBarData, NamedLink, NavbarToken, SqlData } from '../../utils/types';
import { DesktopNavbarInterface } from '../../utils/interfaces';
import { DatabaseController } from '../../../../models/DatabaseController';


class DesktopNavbar implements DesktopNavbarInterface
{
  private _info: NavbarToken[];
  private _logo: NamedLink;
  private _tabs: NavbarToken[];
  private _profiles: NavbarToken[];
  private _data: DesktopNavBarData;
  private _db: DatabaseController;


  constructor() {
    this._info = [];
    this._logo = { name: '', link: ''};
    this._tabs = [];
    this._profiles = [];
    this._data = {
      info: [],
      menu: {
        logo: { name: '', link: ''},
        tabs: []
      },
      profiles: []
    };
    this._db = new DatabaseController(db);
  };

  get data() {
    return this._data;
  }
  
  
  private sort(data: SqlData) {
    if (data instanceof Array && data.length > 0) {
      data.forEach((element: any) => { 
        switch(element.type)
        {
          case 'info':
            this._info.push(element);
            break;
          case 'logo':
            this._logo = element;
            break;
          case 'tabs':
            this._tabs.push(element);
            break;
          case 'profile':
            this._profiles.push(element);
            break;
          default:
            break;
        }
      });
    }
  };

  public fetchData() {
    return this._db.fetchAll('desktop_navbar');
  };

  public createToken(data: SqlData) {
    this.sort(data);

    const token: DesktopNavBarData = {
      info: this._info,
      menu: {
        logo: this._logo,
        tabs: this._tabs
      },
      profiles: this._profiles
    }

    return token;
  };
};

export { DesktopNavbar };
