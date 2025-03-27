import { OrderStatus } from '@/types/orderType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/api/orderedItemsApi';

/** 주문 상품 상태를 변경하는 쿼리 훅 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
