
import db from '../../utils/database';

import { DesktopNavBarData, NamedLink, NavbarToken } from '../../utils/types';
import { DesktopNavbarInterface } from '../../utils/interfaces';
import { DatabaseController } from '../../../../models/DatabaseController';


class DesktopNavbar implements DesktopNavbarInterface
{
  private _rawData: NavbarToken[];
  private _data: DesktopNavBarData[];
  private _db: DatabaseController;

  private info: NavbarToken[] = [];
  private menu = {
    logo: { name: '', link: ''},
    tabs: []
  };
  private profiles: NavbarToken[] = []

  constructor() {
    this._rawData = [];
    this._data = [];
    this._db = new DatabaseController(db);
  };

  public fetchData() {
    return this._db.fetchAll('desktop_navbar');
  };

  public filter(raw: NavbarToken[]) {

  }
};

export { DesktopNavbar };
