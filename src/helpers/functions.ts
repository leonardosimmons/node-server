
import { Combinable, HttpError } from '../utils/types';

const jwt = require('jsonwebtoken');
const {
  TOKEN_SECRET
} = process.env;

/**
 * returns an array of the values contained within the given object
 * @param obj 
 * @returns 
 */
export function getObjVal<T>(obj: T): Array<T[keyof T] | null> {
  let k: keyof typeof obj;
  let v: Array<T[keyof T] | null> = [];
  for (k in obj) {
    if (obj[k]) {
      v.push(obj[k]);
    } else {
      v.push(null);
    }
  }

  return v;
};

/**
 * Generates a JSON Web Token
 * @param username 
 */
export function generateAccessToken<T>(data: T, expires: string) {
  return jwt.sign({...data}, TOKEN_SECRET, { expiresIn: expires });
};

/**
 * Generates and returns a hashed string
 * @param bytes 
 * @returns 
 */
export function generateRandHash(bytes?: number): string {
  return require('crypto').randomBytes(bytes ? bytes : 64).toString('hex');
};

function getUniqueListBy(arr: any, key: any) {
  return [...new Map(arr.map((item: any) => [item[key], item])).values()]
}

/**
 * Handles http errors
 * @param err 
 * @param msg 
 * @returns 
 */
export function httpError(err: Error, msg?: string): HttpError {
  const error: HttpError = err;
  error.statusCode = 502;
  error.message = msg ? msg : 'Something went wrong';
  return error;
};

/**
 * Checks the given regular expression against the given parameter
 * @param regex - regular expression
 * @param s - string or number to be checked
 */
export function preg_match(regex: string, c: Combinable): boolean | undefined {
  if (typeof c === 'string')
    return (new RegExp(regex).test(c));
  if (typeof c === 'number') 
    return (new RegExp(regex).test(c.toString()));
};

/**
 *  Generates a random number within the specified range 
 * @param min 
 * @param max 
 * @returns 
 */
export function randNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
};


export function removeDuplicateByVal(arr: Array<any>, val: any) {
  return arr.reduce((unique: any, o) => {
    if(!unique.some((obj: any)=> obj.order.id === o.order.id)) {
      unique.push(o);
    }
    return unique;
  },[]);
};

export function removeDuplicates(arr: any) {
  let seen: any = {};
  let ret_arr = [];
  for (let i = 0; i < arr.length; i++) {
      if (!(arr[i] in seen)) {
          ret_arr.push(arr[i]);
          seen[arr[i]] = true;
      }
  }
  return ret_arr;
};