import { Product } from './product';

export interface Category {
  readonly _id: string;
  name: string;
  types: CategoryType[];
  products: string[] | Product[];
}

export interface CategoryType {
  type: string;
  products: string[] | Product[];
}
