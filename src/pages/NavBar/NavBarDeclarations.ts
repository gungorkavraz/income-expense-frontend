import routes from '../../helper/routes';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  rolesCanAccess?: Array<string>;
}

export const NAV_ITEMS: Array<NavItem> = [
  // List Header Sample
  // {
  //   label: "Inspiration",
  //   children: [
  //     {
  //       label: "Explore Design Work",
  //       subLabel: "Trending Design to inspire you",
  //       href: "#",
  //     },
  //     {
  //       label: "New & Noteworthy",
  //       subLabel: "Up-and-coming Designers",
  //       href: "#",
  //     },
  //   ],
  // },
  //
  // Header Sample
  // {
  //   label: "Stok",
  //   href: routes.listStocks,
  // },
  // End of Sample
  {
    label: 'Kategori Ekle',
    href: routes.addCategory,
  },
];
