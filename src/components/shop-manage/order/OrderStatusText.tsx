import { OrderStatus } from '@/types/orderType';
import { ORDER_STATUS } from '@/utils/translateOrderStatus';

/** 상태를 보여주는 텍스트 컴포넌트 (색깔 변경용) */
export const OrderStatusText = ({ status }: { status: OrderStatus }) => {
  return (
    <div
      className={`whitespace-nowrap px-5 text-center font-semibold ${status === 'cancelled' ? 'text-red-500' : 'text-black'}`}
    >
      {ORDER_STATUS(status)}
    </div>
  );
};
