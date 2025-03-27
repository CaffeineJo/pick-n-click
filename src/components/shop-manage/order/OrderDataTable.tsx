'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { orderedColumns } from './OrderColumnDef';
import { OrderedItem } from '../../../types/orderType';
import { flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { ItemModal } from './ItemModal';

/** 주문 데이터 테이블 */
export const DataTable = ({ data }: { data: OrderedItem[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const table = useReactTable({
    data,
    columns: orderedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Row<OrderedItem>) => {
    setSelectedRowId(row.original.order_id);
    setOpen(true);
  };

  const selectedItem = data.find((item) => item.order_id === selectedRowId);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() => handleRowClick(row)}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ItemModal open={open} setOpen={setOpen} item={selectedItem} />
    </div>
  );
};
