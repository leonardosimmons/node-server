import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

//* -------------------  GENERAL  ------------------- *//
export type NamedLink = {
  name: string;
  link: string;
};

export type SqlData = RowDataPacket | RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;


//* -----------------  INDEX PAGE  ----------------- *//
export type IndexPageHeaderData = {
  id: string;
  heading: string;
  btn: {
    text: string;
    link: string;
  },
  video: string;
};



//* -------------------  NAVBAR  ------------------- *//
export type NavbarToken = {
  id: string;
  type: string;
  name: string;
  link: string;
  src: string;
  alt: string;
  height: number;
  width: number;
};

export type DesktopNavBarData = {
  info: NavbarToken[];
  menu: {
    logo: NamedLink;
    tabs: NavbarToken[];
  };
  profiles: NavbarToken[];
};

export type MobileNavbarData = {
  icons: Omit<NavbarToken, 'name'>[];
  menu: {
    tabs: NamedLink[];
    scrollText: string[];
  };
};