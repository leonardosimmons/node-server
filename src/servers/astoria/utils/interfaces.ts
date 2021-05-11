
import { DesktopNavBarData, MobileNavbarData, SqlData } from "./types";

//* -----------------  INDEX PAGE  ----------------- *//
export interface IndexPageContext {

};


//* -------------------  NAVBAR  ------------------- *//
export interface DesktopNavbarInterface
{
  fetchData: () => Promise<any>;
  createToken: (data: SqlData) => DesktopNavBarData;
};


export interface MobileNavbarInterface
{
  fetchData: () => Promise<any>;
  createToken: (data: SqlData) => MobileNavbarData;
};
