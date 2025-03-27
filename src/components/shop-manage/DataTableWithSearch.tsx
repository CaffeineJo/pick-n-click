'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createColumns } from '@/app/shop-manage/columns';
import type { Payment } from '@/app/shop-manage/columns';
import { DataTable } from './DataTable';

interface Props {
  data: Payment[];
  onUpdate: (updated: Payment) => void;
  onDelete: (id: string) => void;
}

export function DataTableWithSearch({ data, onUpdate, onDelete }: Props) {
  const columns = createColumns(onUpdate, onDelete);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 🔁 디바운싱 구현
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // 300ms 후 반영
    return () => clearTimeout(timeout);
  }, [inputValue]);

  const filteredData = useMemo(() => {
    return data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [data, searchQuery]);

  return (
    <div className="space-y-4 px-4">
      <div className="m-2 flex items-center justify-between gap-2">
        <Input
          type="text"
          placeholder="상품명 검색..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => {
            setInputValue('');
            setSearchQuery('');
          }}
          className="whitespace-nowrap"
        >
          초기화
        </Button>
      </div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
