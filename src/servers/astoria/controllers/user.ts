
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { UserController } from '../models/user';
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
    const error: HttpError = err;
    error.statusCode = 500;
    error.message = 'Unable to add user to database';
    next(error);
  };
};

export async function remove(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

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
    const error: HttpError = err;
    error.statusCode = 500;
    error.message = 'Unable to retrieve users from database';
    next(error);
  }
};

export async function get(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

};

export async function update(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

};
