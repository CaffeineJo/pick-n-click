import { CartItem } from '@/types/cartType';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { formatNumber } from '@/utils/formatNumber';
import { AmountControlButton } from './AmountControlButton';
import { cartStore } from '@/store/cartStore';

/**
 * 장바구니 테이블 컬럼 데이터
 */
export const cartColumns: ColumnDef<CartItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="m-2"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="상품 선택"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'product',
    header: '상품',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex flex-row gap-2 py-5">
          <Image
            src={item.item.thumbnail}
            alt=""
            width={100}
            height={100}
            className="rounded-xl bg-gray-300"
          />
          <div className="flex max-h-[100px] flex-col items-start gap-2 p-1">
            <h3 className="truncate font-bold">{item.item.title}</h3>
            <p className="line-clamp-3 overflow-hidden text-gray-500">{item.item.content}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: '가격',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.item.price)}원
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: '수량',
    cell: ({ row }) => {
      const item = row.original;
      const increment = cartStore((state) => state.increment);
      const decrement = cartStore((state) => state.decrement);

      /**
       * [+] 버튼 함수 핸들러
       */
      const handleUpAmount = () => {
        increment(item.item.id);
      };

      /**
       * [-] 버튼 함수 핸들러
       */
      const handleDownAmount = () => {
        if (item.amount <= 1) return;
        decrement(item.item.id);
      };

      return (
        <div className="px-5">
          <AmountControlButton
            amount={item.amount}
            handleUpAmount={handleUpAmount}
            handleDownAmount={handleDownAmount}
          />
        </div>
      );
    },
  },
  {
    id: 'total',
    header: '합계',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.item.price * item.amount)}원
        </div>
      );
    },
  },
];
