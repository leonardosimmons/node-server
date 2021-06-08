import Express from 'express';
import { HttpError } from '../../../utils/types';
import { ProductController } from '../models/Product';
import { Product, ProductData } from '../utils/types';


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
    let product: Array<Product> = [];

    if (req.query.id) {
      const id: string = req.query.id as string;
      const [ data ] = await controller.fetchProductById(id);
      product = data.map((product: ProductData) => (controller.createToken(product)));

      res.status(200).json({ message: 'Success', payload: product });
    }

    if (req.query.slug) {
      const slug: string = req.query.slug as string;
      const [ data ] = await controller.fetchProduct('slug', slug);
      product = data.map((product: ProductData) => (controller.createToken(product)));

      res.status(200).json({ message: 'Success', payload: product });
    }

  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'unable to retrieve product data from database 2';
    next(error);
  }
};
