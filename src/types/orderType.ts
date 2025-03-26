import { Item } from '@/types/cartType';

/** 주문 아이템 페이지에서 사용할 아이템 타입 */
export type OrderedItem = {
  amount: number;
  created_at: string;
  item_id: number;
  item: Item;
  order_id: number;
  order_status: OrderStatus;
};

/** 주문 상태 타입 */
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
