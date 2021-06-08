
import db from '../utils/database';
import { DatabaseController } from "../../../models/DatabaseController";
import { Buffer, Product, ProductData, SqlData } from '../utils/types';


interface ProductInterface {
  createToken: (data: ProductData) => Product;
  fetchProducts: () => Promise<any>;
  fetchProductById: (id: string) => Promise<any>;
  fetchProduct: (col: string, val: string) => Promise<any>;
};

class ProductController implements ProductInterface
{
  private _db: DatabaseController;

  constructor() {
    this._db = new DatabaseController(db);
  };

  public createToken(data: ProductData): Product {
    return {
      meta: {
        id: data.id,
        slug: data.slug,
      },
      details: {
        type: data.type,
        style: data.style,
        name: data.name,
        price: parseInt(data.price),
        desc: data.description,
        list: data.list.split(' | ')
      },
      preview: {
        image: {
          src: data.image,
          alt: data.name
        },
        link: data.link
      }
    }
  };

  public fetchProducts(): Promise<any> {
    return this._db.fetchAll('products');
  };

  public fetchProductById(id: string): Promise<any> {
    return this._db.fetchById('products', id);
  };

  public fetchProduct(col: string, val: string): Promise<any> {
    return this._db.fetchByColumn('products', col, val)
  };
};

export { ProductController };
