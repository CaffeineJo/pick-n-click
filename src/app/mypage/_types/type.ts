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

export type Orders = {
  amount: number;
  created_at: string;
  item_id: number;
  items: Items;
  order_id: number;
  order_status: string;
};

export type Items = {
  thumbnail: string;
  title: string;
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
