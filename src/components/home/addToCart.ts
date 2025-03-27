import { CartItem } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';

export function addToCart(item: CartItem) {
  const addItem = cartStore.getState().addItem;
  const updateItem = cartStore.getState().updateItem;
  const itemIds = cartStore.getState().itemIds;

  if (itemIds && itemIds.includes(item.id)) {
    alert('동일한 상품이 장바구니에 있어 수량이 변경됩니다.');
    updateItem(item);
  } else {
    alert('상품이 장바구니에 추가되었습니다.');
    addItem(item);
  }
}