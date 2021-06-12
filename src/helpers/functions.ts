import { Combinable } from '../utils/types';

/**
 * returns an array of the values contained within the given object
 * @param obj 
 * @returns 
 */
export function getObjVal<T>(obj: T): Array<T[keyof T]> {
  let k: keyof typeof obj;
  let v: Array<T[keyof T]> = [];
  for (k in obj) {
    v.push(obj[k]);
  }

  return v;
}

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
