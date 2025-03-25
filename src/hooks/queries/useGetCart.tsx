import { getItemsByIdArray } from '@/api/itemsApi';
import { Item } from '@/types/cartType';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

/**
 * 장바구니 아이템 정보를 가져오는 쿼리 훅
 * @param itemIds 장바구니에 담긴 아이템 id 배열
 * - 장바구니 스토어로부터 가져와야 합니다.
 */
export const UseGetCart = (itemIds: number[] | null): UseQueryResult<Item[], Error> => {
  return useQuery({
    queryKey: ['cart', itemIds],
    queryFn: () => {
      if (itemIds === null) throw new Error('장바구니 목록을 가져오는 도중 오류가 발생했습니다.');
      return getItemsByIdArray(itemIds);
    },
    enabled: itemIds !== null,
  });
};
