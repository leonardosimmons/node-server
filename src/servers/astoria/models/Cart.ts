
import db from '../utils/database';
import { DatabaseController } from '../../../models/DatabaseController';
import { table } from '../utils/keys';
import { CartTableData } from '../utils/types';


interface CartControllerInterface {

};


class CartController implements CartControllerInterface 
{
  private _db: DatabaseController;

  constructor() {
    this._db = new DatabaseController(db);
  };

  public addProduct(p: CartTableData) {
    const rows: string = 'id, u_id, prod_id, size, quantity';
    return this._db.create(table.CART, rows, p);
  };

  public fetchAll() {
    return this._db.fetchAll(table.CART);
  };
  
  public updateProductQuantity(id: number, newVal: number) {
    const col: string = 'quantity';
    return this._db.update(table.CART, id, col, newVal);
  }
};


export { CartController };