import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

//* -------------------  GENERAL  ------------------- *//
export type Buffer<T> = T | Array<T> | undefined;

export type Button = {
  text: string;
  link: string;
};

export type Combinable = string | number;

export type Image = {
  src: string;
  alt: string;
  width?: Combinable;
  height?: Combinable;
};

export type NamedLink = {
  name: string;
  link: string;
};

export type SqlData = RowDataPacket | RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export type Text = {
  name?: string;
  title?: string;
  text?: string;
  heading?: string;
  subHeading?: string;
  lineOne?: string;
  lineTwo?: string;
  lineThree?: string;
  body?: string;
  bodyTwo?: string;
};

//* -----------------  INDEX PAGE  ----------------- *//
export type IndexPageHeaderData = {
  id: string;
  heading: string;
  textAbove: string;
  btn: {
    text: string;
    link: string;
  },
  video: string;
};

export type IndexPageStaticData = {
  one: ProductPromoCard
  two: {
    text: Text;
    btn: Button;
  };
  three: ProductPromoCard;
  four: {
    text: Text;
    btn: Button;
  };
  appt: {
    text: Text;
    btnOne: Button;
    btnTwo: Button;
  };
};

//* -------------------  PRODUCT  ------------------- *//
export type ProductPromoCard = {
  img: Image;
  text: Text;
  btn: Button;
  tag: {
    img: Image;
    text: Text;
    btn: Button;
  };
};

export type ProductData = {
  id: string;
  slug: string;
  style: string;
  type: string;
  name: string;
  price: string;
  description: string;
  img: string;
  list: string;
};

export type Product = {
  id: string;
  slug: string;
  style: string;
  details: {
    type: string;
    name: string;
    price: number;
    desc: string;
    img: string;
    list: Array<string>;
  };
}

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
  info: Array<NavbarToken>;
  menu: {
    logo: NamedLink;
    tabs: Array<NavbarToken>;
  };
  profiles: Array<NavbarToken>;
};

export type MobileNavbarData = {
  icons: Array<Omit<NavbarToken, 'name'>>;
  menu: {
    tabs: Array<NamedLink>;
    scrollText: Array<string>;
  };
};
