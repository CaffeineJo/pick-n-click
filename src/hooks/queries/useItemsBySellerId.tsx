// useItemsBySellerId.ts
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { getItemsBySellerId } from '@/api/itemsApi';
import { Payment } from '@/app/shop-manage/columns';

/**
 * @param sellerId - 상품을 불러올 판매자 ID
 * @param options - React Query의 추가 옵션 (enabled 등)
 */
export const useItemsBySellerId = (
  sellerId: number,
  options?: Omit<UseQueryOptions<Payment[], Error>, 'queryKey' | 'queryFn'>,
): UseQueryResult<Payment[], Error> => {
  return useQuery<Payment[], Error>({
    queryKey: ['items', sellerId],
    queryFn: () => getItemsBySellerId(sellerId),
    enabled: Boolean(sellerId), // 기본 enabled 설정
    ...options, // 외부에서 받은 옵션 병합
  });
};
