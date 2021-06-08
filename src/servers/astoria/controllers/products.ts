import Express from 'express';
import { HttpError } from '../../../utils/types';
import { ProductController } from '../models/Product';
import { ProductData } from '../utils/types';


export async function getAllProducts(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  try
  {
    const controller: ProductController = new ProductController();
    const [ data ] = await controller.fetchProducts();
    const products = data.map((product: ProductData) => (controller.createToken(product)));

    res.status(200).json({ 
      message: 'Success', 
      payload: products 
    });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'unable to retrieve products from database';
    next(error);
  }
};

export async function getProduct(req: Express.Request, res: Express.Response, next: Express.NextFunction) 
{
  try
  {
    const controller: ProductController = new ProductController();
    const id: string = req.query.id as string;
    const [ data ] = await controller.fetchProductById(id);
    const product = data.map((product: ProductData) => (controller.createToken(product)));

    res.status(200).json({ 
      message: 'Success', 
      payload: product 
    });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'unable to retrieve product data from database 2';
    next(error);
  }
};
