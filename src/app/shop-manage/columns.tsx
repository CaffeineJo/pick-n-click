//app/shop-manage/columns.tsx

'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { DialogRowActions } from '@/components/shop-manage/DialogRow';

export type Payment = {
  id: string;
  stock: number;
  status: '판매중' | '품절';
  title: string;
  price: number;
};

export const createColumns = (
  onUpdate: (updated: Payment) => void,
  onDelete: (id: string) => void,
): ColumnDef<Payment>[] => [
  {
    accessorKey: 'status',
    cell: ({ row }) => <div className="min-w-16 lowercase">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        상품명
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="min-w-40 lowercase">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'stock',
    header: '재고',
  },
  {
    accessorKey: 'price',
    header: '가격',
  },
  {
    id: 'actions',
    header: ' ',
    cell: ({ row }) => (
      <DialogRowActions payment={row.original} onUpdate={onUpdate} onDelete={onDelete} />
    ),
  },
];
