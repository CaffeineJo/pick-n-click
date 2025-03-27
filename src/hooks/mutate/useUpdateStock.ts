import { updateStock } from '@/api/itemsApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** 재고를 변경하는 뮤테이션 훅 */
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, stock }: { itemId: number; stock: number }) =>
      updateStock(itemId, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
