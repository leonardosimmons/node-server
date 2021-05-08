
import { DatabaseController } from '../../../../models/DatabaseController';
import db from '../../utils/database';

import { MobileNavbarInterface } from '../../utils/interfaces';


class MobileNavbar implements MobileNavbarInterface
{
  private _db: DatabaseController;

  constructor()
  {
    this._db = new DatabaseController(db);
  }
};

export { MobileNavbar };