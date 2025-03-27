import { ColumnDef } from '@tanstack/react-table';
import { OrderedItem } from '../../../types/orderType';
import Image from 'next/image';
import { OrderStatusText } from './OrderStatusText';

/** 주문 상품 테이블 컬럼 데이터 */
export const orderedColumns: ColumnDef<OrderedItem>[] = [
  {
    id: 'orderId',
    header: '주문번호',
    cell: ({ row }) => {
      const item = row.original;

      return <div className="whitespace-nowrap px-5 text-center">{item.order_id}</div>;
    },
  },
  {
    id: 'product',
    header: '상품',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-row gap-2 py-5">
          <div className="relative h-[100px] w-[100px]">
            <Image
              src={item.item.thumbnail}
              alt={item.item.title}
              fill
              className="rounded-xl bg-gray-300 object-cover"
            />
          </div>
          <div className="flex max-h-[100px] flex-col items-start gap-2 p-1">
            <h3 className="truncate font-bold">{item.item.title}</h3>
            <p className="line-clamp-3 overflow-hidden text-gray-500">{item.item.content}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'amount',
    header: '수량',
    cell: ({ row }) => {
      const item = row.original;
      return <div className="whitespace-nowrap px-5 text-center">{item.amount}</div>;
    },
  },
  {
    id: 'status',
    header: '상태',
    cell: ({ row }) => {
      const item = row.original;
      return <OrderStatusText status={item.order_status} />;
    },
  },
];
