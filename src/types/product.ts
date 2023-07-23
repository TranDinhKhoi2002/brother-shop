import { Category } from './category';

export interface Product {
  readonly _id: string;
  name: string;
  category: string | Category;
  price: number;
  oldPrice?: number;
  description: string;
  images: ProductImages;
  sizes: ProductSize[];
  totalSold: number;
  state: string;
}

export interface ProductImages {
  mainImg: string;
  subImg: string;
}

export interface ProductSize {
  name: string;
  quantity: number;
  sold: number;
}
