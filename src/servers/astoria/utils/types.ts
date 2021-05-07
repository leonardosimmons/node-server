
//* -------------------  GENERAL  ------------------- *//
export type NamedLink = {
  name: string;
  link: string;
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