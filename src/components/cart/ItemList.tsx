'use client';

import { cartStore } from '@/store/cartStore';
import { cartColumns } from './CartColumnDef';
import { DataTable } from './CartDataTable';
import { UseGetCart } from '@/hooks/queries/useGetCart';

/** 장바구니 아이템 리스트 컴포넌트 */
export const ItemCardList = () => {
  const itemIds = cartStore((state) => state.itemIds);
  const { data: cartItems, isPending, isError } = UseGetCart(itemIds);

  if (itemIds === null || itemIds.length === 0) {
    return <div className="p-5 text-gray-500">장바구니가 비어있습니다.</div>;
  }

  if (isPending || isError) {
    return <div>불러오는 중...</div>;
  }

  return <DataTable columns={cartColumns} data={cartItems} />;
};
