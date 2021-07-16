
import db from '../../../utils/database';
import { DatabaseController } from '../../../models/DatabaseController';
import { table } from '../utils/keys';
import { CartTableData, Product, ProductCartToken } from '../utils/types';


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

  public createToken(u_id: number, product: Product, order: { id: number, size: string, quantity: number }): ProductCartToken {
    return {
      user: { id: u_id },
      product,
      order
    };
  };

  public fetchAll(): Promise<any> {
    return this._db.fetchAll(table.CART);
  };

  public fetchByUser(u_id: number): Promise<any> {
    return this._db.fetchByColumn(table.CART, 'u_id', u_id);
  }

  public removeProduct(id: number) {
    return this._db.delete(table.CART, id);
  }
  
  public updateProductQuantity(id: number, newVal: number): Promise<any> {
    const col: string = 'quantity';
    return this._db.update(table.CART, id, col, newVal);
  };
};


export { CartController };
