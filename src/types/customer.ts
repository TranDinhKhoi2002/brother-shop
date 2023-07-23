import { Gender } from '@/common/enums';
import { Account } from './auth';
import { Order } from './order';
import { Product } from './product';
import { Promotion } from './promotion';

export interface Customer {
  readonly _id: string;
  account: string | Account;
  orders: string[] | Order[];
  wishlist: string[] | Product[];
  promotions: string[] | Promotion[];
  cart: CartItem[];
  name: string;
  address: Address[];
  email: string;
  phone?: string;
  gender: Gender.MALE | Gender.FEMALE | Gender.OTHER;
  birthday: Date;
  verified: boolean;
}

export interface CartItem {
  productId: string | Product;
  size: string;
  quantity: number;
}

export interface Address {
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  detail: string;
  isDefault: boolean;
}
