
import Express from 'express';
import { ProductController } from '../models/Product';
import { CartController } from '../models/Cart';
import { HttpError } from '../../../utils/types';
import { CartTableData, Product, ProductCartToken, ProductData } from '../utils/types';
import { httpError, randNum } from '../../../helpers/functions';

export async function addProductToCart(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  try {
    if(!req.body) {
      res.statusCode = 404;
      res.end('Error');
      return;
    }

    const cntrl: CartController = new CartController();
    const min: number = 100000000;
    const max: number = 999999999;

    let buffer: CartTableData | undefined;

    const r: Partial<CartTableData> = {
      u_id: res.locals.u_id,
      prod_id: req.body.prod_id,
      size: req.body.size,
      quantity: req.body.quantity
    };
    
    const [ data ] = await cntrl.fetchAll();
    
    await data.forEach((p: CartTableData) => {
      if(p.u_id === r.u_id && p.prod_id === r.prod_id && p.size === r.size) {
        buffer = p;
      }
    });
    
    if(!buffer) {
      const token: CartTableData = {
        id: randNum(min, max),
        u_id: r.u_id!,
        prod_id: r.prod_id!,
        size: r.size!,
        quantity: r.quantity!
      }

      if (token.u_id !== undefined) {
        cntrl.addProduct(token);
      }
    } 

    if (buffer) {
      const newVal = parseInt(buffer.quantity) + parseInt(r.quantity as string);

      if(newVal !== undefined) {
        cntrl.updateProductQuantity(buffer.id, newVal);
      }
    }

    res.status(200).json({
      message: 'Success',
      payload: true
    });
    
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'Unable to add product to cart';
    next(error);
  }
};

export async function getUserCart(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  let products: Array<Product> = [];
  let userCart: Array<ProductCartToken> = [];
  const u_id: string = res.locals.u_id;

  const cartCntrl: CartController = new CartController();
  const prodCntrl: ProductController = new ProductController();

  try {
    const [ cartData ] = await cartCntrl.fetchByUser(parseInt(u_id));
    const [ prodData ] = await prodCntrl.fetchProducts();

    // matches each prod_id with full product info
    cartData.map((c: CartTableData) => {
      prodData.map((p: ProductData) => {
        if (parseInt(p.id) === c.prod_id) {
          const token: Product = prodCntrl.createToken(p);
          products.push(token);
        }
      })
    });
    
    // Creates user's cart
    cartData.map((c: CartTableData) => {
      products.map((p: Product) => {
        if (parseInt(p.meta.id) === c.prod_id) {
          const token: ProductCartToken = cartCntrl.createToken(parseInt(u_id), p, { id: c.id, size: c.size, quantity: parseInt(c.quantity) });
          userCart.push(token);
        }
      });
    });


    res.status(200).json({ 
      message: 'Success', 
      payload: userCart 
    });
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'Unable to retrieve the user\'s cart';
    next(error);
  }
};

export async function removeProductFromCart(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  const id: string = req.query.order_id as string;
  const cntrl: CartController = new CartController();

  try {
    await cntrl.removeProduct(parseInt(id));

    res.status(200).json({ message: 'Product successfully removed' });
  }
  catch(err) {
    const msg: string = 'Unable to remove product from cart';
    next(httpError(err, msg));
  }
};

export async function updateProductQuantity(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  if(!req.body) {
    res.statusCode = 404;
    res.end('Error');
    return;
  }

  const i: number = req.body.id;
  const q: number = req.body.quantity; 
  const cntrl: CartController = new CartController();

  try {
    if (i && q) {
      await cntrl.updateProductQuantity(i, q);
    }
  }
  catch(err) {
    const msg: string = 'Unable to update product quantity.';
    next(httpError(err, msg));
  }

  res.status(200).json({
    message: 'Success'
  })
};
