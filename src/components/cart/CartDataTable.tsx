'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Item } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';
import { CartTotal } from './CartTotal';

interface DataTableProps {
  columns: ColumnDef<Item>[];
  data: Item[];
}

/**
 * 데이터 테이블 컴포넌트
 * @param DataTableProps.columns - 장바구니 컬럼 데이터
 * @param DataTableProps.data - 아이템 리스트 (수량 포함 X)
 */
export function DataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const removeItem = cartStore((state) => state.removeItem);

  // 체크 박스 선택 true를 디폴트 값으로 설정
  useEffect(() => {
    const allSelected: RowSelectionState = {};
    data.forEach((row) => {
      allSelected[row.item_id] = true;
    });
    setRowSelection(allSelected);
  }, [data]);

  /** 테이블 인스턴스 */
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    getRowId: (row) => row.item_id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * 삭제 버튼 이벤트 핸들러
   * - rowSelection이 비어있지 않을 경우에만 동작합니다.
   */
  const handleClickDelete = () => {
    const idList = Object.keys(rowSelection);

    if (idList.length === 0) return;
    const isConfirmed = confirm('선택한 상품을 삭제하시겠습니까?');
    if (isConfirmed) {
      removeItem(idList);
    }
  };

  /**
   * 체크박스로 선택한 아이템 리스트를 반환하는 함수
   * @returns 선택한 아이템 리스트
   */
  const getSelectedRowsOriginal = (): Item[] => {
    return table.getSelectedRowModel().rows.map((row) => row.original);
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleClickDelete} className="self-start p-3 text-xs font-semibold">
        선택 삭제
      </Button>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
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
      </div>
      <CartTotal items={getSelectedRowsOriginal()} />
    </div>
  );
}
