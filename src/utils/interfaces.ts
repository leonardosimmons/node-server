import { Combinable } from "./types";

export interface DatabaseControllerInterface 
{
  delete: (table: string, id: Combinable) => Promise<any>;
  fetchAll: (table: string) => Promise<any>;
  fetchById: (table: string, id: Combinable) => Promise<any>;
  save: (table: string, rows: string, holder: string, values: any) => Promise<any>;
};