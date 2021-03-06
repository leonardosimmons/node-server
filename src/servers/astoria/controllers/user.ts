
import Express from 'express';
import { AccessToken } from '../../../utils/types';
import { HashToken, NewUserToken, User, UserTableData } from '../utils/types';

import { UserController } from '../models/user';
import { generateAccessToken, httpError } from '../../../helpers/functions';
import { HashController } from '../../../models/HashController';


export async function add(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    if(!req.body) {
      res.statusCode = 404;
      res.end('Error');
      return;
    }

    const cntrl: UserController = new UserController();

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
  catch(err) {
    const msg: string = 'Unable to add user to database';
    next(httpError(err, msg));
  };
};


export async function getUser(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
  let user: Array<User> = [];
  const cntrl: UserController = new UserController();
  const loc: string = req.query.loc as string;
  const val: string = req.query.val as string;

  try {
    const [ data ] = await cntrl.fetch(loc, val);
    const user = data.map((u: UserTableData) => (cntrl.createToken(u)));

    res.status(200).json({ message: 'Success', payload: user });
  }
  catch(err) {
    const msg: string = 'Unable to retrieve user from database';
    next(httpError(err, msg));
  }
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


export async function signIn(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    if(!req.body) {
      res.statusCode = 404;
      res.end('Error');
      return;
    }

    const cntrl: UserController = new UserController();

    const u_id: string = req.body.u_id as string;
    const col: string = 'signed_in';

    await cntrl.update(parseInt(u_id), col, 1);
    const token: AccessToken = generateAccessToken({u_id}, '12h');

    res.status(200).json({
      message: 'Success',
      payload: {
        u_id,
        token,
        signedIn: true
      }
    });
  }
  catch(err) {
    const msg: string = 'Unable to sign in user';
    next(httpError(err, msg));
  }
};


export async function signOut(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    if(!req.body) {
      res.statusCode = 404;
      res.end('Error');
      return;
    }

    const cntrl: UserController = new UserController();

    const id: string = req.body.u_id as string;
    const col: string = 'signed_in';

    await cntrl.update(parseInt(id), col, 0);

    res.status(200).json({
      message: 'success',
      payload: true
    });
  }
  catch(err) {
    const msg: string = 'Unable to sign out user';
    next(httpError(err, msg));
  }
}

export async function signUp(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void>
{
  try {
    if (!req.body) {
      res.statusCode = 404;
      res.end('Error');
      return;
    }

    const cntrl: UserController = new UserController();
    const hasher: HashController = new HashController();

    const name: string = req.body.name;
    const email: string = req.body.email;
    const image: string = req.body.image;
    const tempPw: string = req.body.password;

    await cntrl.generateId()
    .then((n: number) => {
      const id: number = n
      
      if (name) {
        const hash: HashToken = hasher.hashPassword(tempPw);

        const newUser: NewUserToken = {id, name, email, image, password: hash.hashedValue};
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
  catch(err) {
    const msg: string = 'Unable to add user to database';
    next(httpError(err, msg));
  };
}