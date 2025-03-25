import { CartItem, Item } from '@/types/cartType';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartStore = {
  /** 현재 저장된 장바구니 목록 */
  items: { [key: Item['item_id']]: number };

  /** 현재 저장된 아이템 id 목록 */
  itemIds: number[] | null;

  /**
   * 장바구니에 새로운 아이템 추가
   * @param newItem - 새로운 아이템
   */
  addItem: (newItem: CartItem) => void;

  /**
   * 장바구니 아이템 수량 업데이트
   * @param item - 업데이트할 아이템
   */
  updateItem: (item: CartItem) => void;

  /**
   * 장바구니에서 아이템 삭제
   * @param idList - 삭제할 아이템의 id 리스트
   */
  removeItem: (idList: string[]) => void;

  /**
   * 아이템의 개수를 1 증가
   * @param itemId - 아이템의 id
   */
  increment: (itemId: number) => void;

  /**
   * 아이템의 개수를 1 감소
   * @param itemId - 아이템의 id
   */
  decrement: (itemId: number) => void;
};

/**
 * 장바구니 저장을 위한 스토어 생성
 * 장바구니 리스트를 전역적으로 관리하고 local storage에 저장합니다.
 */
export const cartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: {},

      itemIds: null,

      addItem: (newItem: CartItem) => {
        set((state) => {
          const itemIds = state.itemIds ? [...state.itemIds, newItem.id] : [newItem.id];
          return { items: { ...state.items, [newItem.id]: newItem.amount }, itemIds };
        });
      },

      updateItem: (item: CartItem) => {
        set((state) => {
          const amount = state.items[item.id];
          return { items: { ...state.items, [item.id]: item.amount + amount } };
        });
      },

      removeItem: (idList: string[]) => {
        set((state) => {
          const items = { ...state.items };
          idList.forEach((id: string) => {
            delete items[parseInt(id)];
          });
          const itemIds = state.itemIds?.filter((id) => !idList.includes(id.toString()));
          return { items, itemIds };
        });
      },

      increment: (itemId: number) =>
        set((state) => {
          const currentQuantity = state.items[itemId];
          return {
            items: {
              ...state.items,
              [itemId]: currentQuantity + 1,
            },
          };
        }),

      decrement: (itemId: number) =>
        set((state) => {
          const currentQuantity = state.items[itemId];
          return {
            items: {
              ...state.items,
              [itemId]: currentQuantity - 1,
            },
          };
        }),
    }),
    {
      name: 'cart-storage',
    },
  ),
);
