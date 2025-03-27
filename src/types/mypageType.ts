import { OrderStatus } from './orderType';

export type User = {
  nickname: string;
  email: string;
  introduction: string;
};

export type TabContents = {
  orders: Orders[];
  reviews_written: Reviews[];
  reviews_unwritten: Reviews[];
};
export type Items = {
  thumbnail: string;
  title: string;
};

export type Orders = {
  order_id: number;
  amount: number;
  created_at: string;
  item_id: number;
  order_status: OrderStatus;
  items: Items;
};

export type Reviews = {
  content: string;
  created_at: string;
  items: Items;
  item_id: number;
  review_id: number;
  uid: string;
  written: boolean;
};
