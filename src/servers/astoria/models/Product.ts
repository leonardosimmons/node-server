
import db from '../utils/database';
import { DatabaseController } from "../../../models/DatabaseController";
import { ProductData, SqlData } from '../utils/types';


interface ProductInterface {
  fetchProducts: () => Promise<any>;
  fetchProductById: (id: string) => Promise<any>;
};

class ProductController implements ProductInterface
{
  private _db: DatabaseController;
  private _data: ProductData;


  constructor() {
    this._db = new DatabaseController(db);
    this._data = <ProductData>{};
  };


  public fetchProducts(): Promise<any> {
    return this._db.fetchAll('products');
  }

  public fetchProductById(id: string): Promise<any> {
    return this._db.fetchById('products', id);
  };
};

export { ProductController };
