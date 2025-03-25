/**
 * 개별 아이템의 타입
 */
export type Item = {
  item_id: number;
  seller_id: number;
  title: string;
  content: string;
  thumbnail: string;
  stock: number;
  price: number;
  img_list?: string; // JSON 문자열
};

/**
 * 로컬 스토리지에 저장하기 위한 타입
 */
export type CartItem = {
  id: Item['item_id'];
  amount: number;
};
