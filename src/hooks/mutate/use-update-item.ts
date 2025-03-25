// mutate/use-update-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '@/api/itemsApi';
import type { Payment } from '@/app/shop-manage/columns';

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updated: Payment) =>
      updateItem(updated.id, {
        title: updated.title,
        price: updated.price,
        stock: updated.stock,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (error) => {
      console.error('상품 수정 실패:', error);
    },
  });
};
