
import Express from 'express';
import { httpError } from '../../../helpers/functions';
import { UserController } from '../models/User';
import { NewUserToken, User, UserTableData } from '../utils/types';


export async function add(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    const cntrl: UserController = new UserController();

    if (req.body) {
      const name: string = req.body.name;
      const email: string = req.body.email;
      const image: string = req.body.image;

      await cntrl.generateId()
      .then((n: number) => {
        const id: number = n
        
        if (name) {
          const newUser: NewUserToken = {id, name, email, image};
  
          cntrl.create(newUser);
          
          return newUser;
        }
      })
      .then((user) => {
        res.status(201).json({
          message: 'User successfully added to the database',
          payload: {
            id: user?.id as number,
            info: {
              name: user?.name as string,
              email: user?.email as string,
              image: user?.image as string
            }
          }
        });
      })
      .catch(err => { throw new Error(err)}) 
    }
  }
  catch(err) {
    const msg: string = 'Unable to add user to database';
    next(httpError(err, msg));
  };
};

export async function getAll(_: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    let users: Array<User> = [];
    const cntrl: UserController = new UserController();
    const [ data ] = await cntrl.fetchAll();

    users = data.map((u: UserTableData): User => ({
      id: u.id,
      info: {
        name: u.name,
        email: u.email,
        image: u.image
      }
    }));

    res.status(200).json({
      message: 'Success',
      payload: users
    });
  }
  catch(err) {
    const msg: string = 'Unable to retrieve users from database';
    next(httpError(err, msg));
  }
};

export async function get(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

};

export async function signIn(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    const cntrl: UserController = new UserController();

    if(req.body) {
      const id: string = req.body.u_Id as string;
      const col: string = 'signed_in';

      cntrl.update(parseInt(id), col, 1);

      res.status(200).json({
        message: 'Success',
        payload: true
      });
    }
  }
  catch(err) {
    const msg: string = 'Unable to sign in user';
    next(httpError(err, msg));
  }
};

export async function signOut(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    const cntrl: UserController = new UserController();

    if(req.body) {
      const id: string = req.body.u_Id as string;
      const col: string = 'signed_in';

      cntrl.update(parseInt(id), col, 0);

      res.status(200).json({
        message: 'success',
        payload: false
      });
    }
  }
  catch(err) {
    const msg: string = 'Unable to sign out user';
    next(httpError(err, msg));
  }
}

export async function update(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

};
