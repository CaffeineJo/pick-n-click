'use client';

import { CartItem } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';
import { Button } from '../ui/button';

/**
 * 장바구니 추가 버튼
 * @param item - 새로운 아이템
 * @example
 * ```tsx
 * <AddCartButton {...someItem} />
 * ```
 * - 파라미터 item은 CartItem 타입만 지켜서 넣어주시면 됩니다.
 */
export const AddCartButton = (item: CartItem) => {
  const addItem = cartStore((state) => state.addItem);
  const updateItem = cartStore((state) => state.updateItem);
  const itemIds = cartStore((state) => state.itemIds);

  /**
   * 장바구니 추가 핸들러 함수
   * - 이미 아이템이 있을 경우 updateItem, 없는 경우 addItem를 사용합니다.
   */
  const handleAddItemToCart = (item: CartItem) => {
    if (itemIds && itemIds.includes(item.id)) {
      alert('동일한 상품이 장바구니에 있어 수량이 변경됩니다.');
      updateItem(item);
    } else {
      alert('상품이 장바구니에 추가되었습니다.');
      addItem(item);
    }
  };

  return <Button onClick={() => handleAddItemToCart(item)}>장바구니 추가</Button>;
};
