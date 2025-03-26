import { useQuery } from '@tanstack/react-query';
import { getOrderedItemsBySellerId } from '@/api/orderedItemsApi';
import { getSellerInfo } from '@/api/sellersApi';

/**
 * 판매자의 주문 아이템 정보를 가져오는 쿼리 훅
 * @param id 판매자의 uuid
 */
export const UseGetOrders = (id: string) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const sellerInfo = await getSellerInfo(id);
      const data = await getOrderedItemsBySellerId(sellerInfo?.seller_id);
      return data;
    },
  });
};
