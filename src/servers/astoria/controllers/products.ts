import Express from 'express';
import { HttpError } from '../../../utils/types';
import { ProductController } from '../models/Product';


export async function getAllProducts(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  try
  {
    const controller: ProductController = new ProductController();
    const [ products ] = await controller.fetchProducts();

    console.log(products);

    res.status(200).json({ message: 'Success', payload: products });
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
    const [ product ] = await controller.fetchProductById(id);

    // console.log(product);

    res.status(200).json({ message: 'It worked', id : id, data: product });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'unable to retrieve product data from database 2';
    next(error);
  }
};
