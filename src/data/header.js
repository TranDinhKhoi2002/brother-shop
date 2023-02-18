import {
  ancientGodProducts,
  basicProducts,
  beltProducts,
  hatProducts,
  heroProducts,
  items,
  joggerProducts,
  largeFormProducts,
  longTrousersProducts,
  mascotProducts,
  shirtProducts,
  simpleProducts,
  simpleShirt,
  simpleTShirt,
  simpleTShirt2,
  simplifyProducts,
  sockProducts,
  spaceProducts,
  sportProducts,
} from './images';

export const DETAILS_ITEMS = [
  {
    title: 'ÁO THUN',
    to: '/category/ao-thun',
    hasChildren: true,
    items: [
      {
        name: 'Áo Thun Form Tiêu Chuẩn',
        path: '/category/ao-thun-form-tieu-chuan',
      },
      {
        name: 'Áo Thun Form Rộng',
        path: '/category/ao-thun-form-rong',
        products: largeFormProducts,
      },
      {
        name: 'Áo thun 3 Lỗ',
        path: '/category/ao-thun-3-lo',
      },
    ],
    generalProducts: shirtProducts,
  },
  {
    title: 'QUẦN DÀI',
    to: '/category/quan-dai',
    hasChildren: true,
    items: [
      {
        name: 'Quần Jogger',
        path: '/category/quan-jogger',
        products: joggerProducts,
      },
      {
        name: 'Quần Tây',
        path: '/category/quan-tay',
      },
      {
        name: 'Quần Ống Rộng',
        path: '/category/quan-ong-rong',
      },
    ],
    generalProducts: longTrousersProducts,
  },
];
