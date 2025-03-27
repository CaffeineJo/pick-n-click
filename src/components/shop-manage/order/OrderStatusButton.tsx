'use client';

import { addReviewData } from '@/api/reviewsApi';
import { Button } from '@/components/ui/button';
import { useUpdateOrderStatus } from '@/hooks/mutate/useUpdateStatus';
import { useUpdateStock } from '@/hooks/mutate/useUpdateStock';
import { OrderedItem, OrderStatus } from '@/types/orderType';
import { ORDER_STATUS } from '@/utils/translateOrderStatus';
import { ChevronRight } from 'lucide-react';

/** 현재 주문 상태와 상태 변경 버튼을 포함하는 컨테이너 컴포넌트 */
export const OrderStatusContainer = ({ item }: { item: OrderedItem }) => {
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: updateStock } = useUpdateStock();

  /** 주문 취소 버튼 핸들러 */
  const handleCancelOrder = () => {
    const isConfirmed = confirm('주문을 취소하시겠습니까?');
    if (!isConfirmed) return;

    if (item.order_status !== 'pending') {
      updateStock({ itemId: item.item_id, stock: item.item.stock + item.amount });
    }
    updateStatus({ orderId: item.order_id, status: 'cancelled' });
  };

  if (item.order_status === 'cancelled')
    return <p className="my-4 w-full text-center font-bold text-red-500">취소된 주문입니다.</p>;
  else if (item.order_status === 'delivered')
    return (
      <div className="my-3 flex flex-col gap-3">
        <StatusStepper currentStatus={item.order_status} />
        <p className="my-4 w-full text-center font-bold">배송 완료되었습니다.</p>
      </div>
    );

  return (
    <>
      <div className="my-3 flex flex-col gap-3">
        <StatusStepper currentStatus={item.order_status} />
        <div className="flex justify-center gap-2">
          <ChangeOrderStatusButton item={item} />
          <Button variant="destructive" onClick={handleCancelOrder}>
            주문 취소
          </Button>
        </div>
      </div>
      {item.order_status === 'pending' && item.amount > item.item.stock && (
        <p className="w-full text-center font-semibold text-red-500">재고가 부족합니다.</p>
      )}
    </>
  );
};

/** 주문 현황을 알 수 있는 스테퍼 컴포넌트 */
const StatusStepper = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  const statusList: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered'];
  return (
    <ul className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-gray-200 p-3">
      {statusList.map((step, index) => (
        <li key={index} className="flex flex-row">
          <span className={`${step === currentStatus ? 'font-bold text-black' : 'text-gray-500'}`}>
            {ORDER_STATUS(step)}
          </span>
          {index < statusList.length - 1 && <ChevronRight className="ml-1 h-5 w-5 text-gray-400" />}
        </li>
      ))}
    </ul>
  );
};

/** 상태를 변경하는 버튼 */
const ChangeOrderStatusButton = ({ item }: { item: OrderedItem }) => {
  const statusList: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered'];
  const currentStatusIndex = statusList.findIndex((status) => status === item.order_status);
  const nextStatus = statusList[currentStatusIndex + 1];
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: updateStock } = useUpdateStock();

  const handleUpdateStatus = async () => {
    const isConfirmed = confirm(`상품의 상태를 ${ORDER_STATUS(nextStatus)}로 변경하시겠습니까?`);
    if (!isConfirmed) return;
    if (item.order_status === 'pending') {
      updateStock({ itemId: item.item_id, stock: item.item.stock - item.amount });
    }
    if (item.order_status === 'shipped') {
      await addReviewData({ uid: item.buyer_id, item_id: item.item_id });
    }
    updateStatus({ orderId: item.order_id, status: nextStatus });
  };

  return (
    <Button
      disabled={item.order_status === 'pending' && item.amount > item.item.stock}
      onClick={handleUpdateStatus}
    >
      {ORDER_STATUS(nextStatus)} 상태로 변경
    </Button>
  );
};
