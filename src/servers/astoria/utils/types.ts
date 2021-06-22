import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

//* --------------------  CART  -------------------- *//
export type CartTableData = {
  id: number;
  u_id: number;
  prod_id: number;
  size: string;
  quantity: string;
};


export type Cart = {

};

export type NewProdInCartToken = {
  u_id: number;
  p_id: number;
  size: string;
  quantity: number;
};


//* -------------------  GENERAL  ------------------- *//
export type Buffer<T> = T | Array<T> | undefined;

export type Button = {
  link: string;
  text?: string;
  classes?: string;
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
  fit: string;
  name: string;
  price: string;
  description: string;
  image: string;
  list: string;
  link: string;
};

export type Product = {
  meta: {
    id: string;
    slug: string;
  };
  details: {
    type: string;
    fit: string;
    style: string;
    name: string;
    price: number;
    desc: string;
    list: Array<string>;
  };
  preview: {
    image: Image;
    link: string;
  };
};

export type ProductCartToken = {
  user: Partial<UserContext>;
  product: Product;
  order: {
    id: number;
    size: string;
    quantity: number;
  };
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

//* --------------------  USER  -------------------- *//
export type UserTableData = {
  id: Combinable;
  name: string;
  email?: string;
  image?: string;
  signed_in?: {
    type: string;
    data: any;
  };
};

export type UserInfo = {
  name: string;
  email?: string;
  image?: string;
};

export type User = {
  id: Combinable;
  info: UserInfo;
};

export type UserContext = {
  id: Combinable;
  info: UserInfo;
  status: {
    isError: boolean;
    isSignedIn: boolean;
  };
};

export type NewUserToken = {
  id: number;
  name: string;
  email: string;
  image: string;
};
