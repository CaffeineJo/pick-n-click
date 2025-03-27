import { OrderStatus } from '@/types/orderType';

// 주문 상태를 한국어로 변환
export const ORDER_STATUS = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return '주문 대기';
    case 'paid':
      return '결제 완료';
    case 'shipped':
      return '발송 완료';
    case 'delivered':
      return '배송 완료';
    case 'cancelled':
      return '취소';
  }
};
