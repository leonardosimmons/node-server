
import Express from 'express';
import { randNum } from '../../../helpers/functions';
import { HttpError } from '../../../utils/types';
import { CartController } from '../models/Cart';
import { CartTableData } from '../utils/types';


export async function addProductToCart(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  try {
    const cntrl: CartController = new CartController();
    const min: number = 100000000;
    const max: number = 999999999;

    let buffer: CartTableData | undefined;

    if(req.body) {
      const r: Partial<CartTableData> = {
        u_id: req.body.u_id,
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
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'Unable to add product to cart';
    next(error);
  }
};

export async function removeProductFromCart(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  try {
    
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'Unable to remove product from cart';
    next(error);
  }
};
