import { DesktopNavBarData, SqlData } from "./types";

//* -------------------  NAVBAR  ------------------- *//
export interface DesktopNavbarInterface
{
  fetchData: () => Promise<any>;
  createToken: (data: SqlData) => DesktopNavBarData;
};


export interface MobileNavbarInterface
{

};