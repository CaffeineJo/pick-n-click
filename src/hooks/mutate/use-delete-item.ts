// mutate/use-delete-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '@/api/itemsApi';

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (error) => {
      console.error('상품 삭제 실패:', error);
    },
  });
};
