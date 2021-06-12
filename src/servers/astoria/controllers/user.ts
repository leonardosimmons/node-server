
import Express from 'express';
import { randNum } from '../../../helpers/functions';
import { HttpError } from '../../../utils/types';
import { UserController } from '../models/user';
import { User, UserTableData } from '../utils/types';


export async function add(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    const cntrl: UserController = new UserController();
    const data: Partial<UserTableData> = req.body;
  
    const dataToken: UserTableData = {
      id: await cntrl.generateId(),
      name: data.name as string,
      email: data.email,
      image: data.image
    };

    //await cntrl.create(dataToken);

    res.status(201).json({
      message: 'User successfully added to the database'
    });
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 500;
    error.message = 'Unable to add user to database';
    next(error);
  }
};

export async function remove(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{

};

export async function getAll(_: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    const user: UserController = new UserController();
    const [ data ] = await user.fetchAll();
    let uD: Array<User> = [];

    uD = data.map((u: UserTableData): User => ({
      id: u.id,
      info: {
        name: u.name,
        email: u.email,
        image: u.image
      }
    }));

    res.status(200).json({
      message: 'Success',
      payload: uD
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
