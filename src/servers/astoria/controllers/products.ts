
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { ProductController } from '../models/Product';
import { Product, ProductData } from '../utils/types';


export async function getAllProducts(_: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try
  {
    let prod: Array<Product>= [];
    const ctrl: ProductController = new ProductController();
    const [ data ] = await ctrl.fetchProducts();

    prod = data.map((p: ProductData) => (ctrl.createToken(p)));

    res.status(200).json({ message: 'Success', payload: prod });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'unable to retrieve products from database';
    next(error);
  }
};

export async function getProduct(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try
  {
    let prod: Array<Product> = [];
    const ctrl: ProductController = new ProductController();
    const loc: string = req.query.loc as string;
    const val: string = req.query.val as string;
    const [ data ] = await ctrl.fetchProduct(loc, val);

    prod = data.map((p: ProductData) => (ctrl.createToken(p)));

    res.status(200).json({ message: 'Success', payload: prod });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'Unable to retrieve product data from database';
    next(error);
  }
};
