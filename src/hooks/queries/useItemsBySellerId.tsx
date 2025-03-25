import { getItemsBySellerId } from '@/api/itemsApi';
import { useQuery } from '@tanstack/react-query';

export const useItemsBySellerId = (sellerId: number) => {
  return useQuery({
    queryKey: ['items', sellerId],
    queryFn: () => getItemsBySellerId(sellerId),
    enabled: !!sellerId,
  });
};
