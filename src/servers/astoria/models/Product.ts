
import db from '../utils/database';
import { DatabaseController } from "../../../models/DatabaseController";
import { Buffer, Product, ProductData, SqlData } from '../utils/types';


interface ProductInterface {
  clearBuffer: () => void;
  createToken: (data: ProductData) => Product;
  fetchProducts: () => Promise<any>;
  fetchProductById: (id: string) => Promise<any>;
};

class ProductController implements ProductInterface
{
  private _db: DatabaseController;
  private _buffer: Buffer<Product>;

  constructor() {
    this._db = new DatabaseController(db);
    this._buffer = <Product>{};
  };

  get buffer() {
    return this._buffer;
  }

  set buffer(data: Product | Array<Product> | undefined) {
    this.clearBuffer();
    this._buffer = data;
  };

  public clearBuffer(): void {
    this._buffer = undefined;
  };

  public createToken(data: ProductData): Product {
    return {
      id: data.id,
      slug: data.slug,
      style: data.style,
      details: {
        type: data.type,
        name: data.name,
        price: parseInt(data.price),
        desc: data.description,
        img: data.img,
        list: data.list.split(' | ')
      }
    }
  };

  public fetchProducts(): Promise<any> {
    return this._db.fetchAll('products');
  };

  public fetchProductById(id: string): Promise<any> {
    return this._db.fetchById('products', id);
  };

};

export { ProductController };
