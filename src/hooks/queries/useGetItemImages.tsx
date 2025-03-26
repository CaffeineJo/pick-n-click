import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getItemById } from '@/api/itemsApi';

/**
 * 단일 상품의 이미지 배열만 가져오는 쿼리 훅
 * @param itemId - 상품 ID
 * @returns string[] - 썸네일 + img_list 포함 이미지 배열
 */

export const useGetItemImages = (
  itemId: number | null
): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ['item-images', itemId],
    queryFn: async () => {
      if (itemId === null) throw new Error('itemId가 null입니다.');

      const data = await getItemById(itemId);
      const item = Array.isArray(data) ? data[0] : data;

      if (!item) return [];

      try {
        const parsed = JSON.parse(item.img_list || '[]');
        return [item.thumbnail, ...parsed];
      } catch {
        return [item.thumbnail];
      }
    },
    enabled: itemId !== null,
  });
};