'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MoreHorizontal } from 'lucide-react';
import type { Payment } from '@/app/shop-manage/columns';

import { useState } from 'react';
import { deleteItem, updateItem } from '@/api/itemsApi';
import { useRouter } from 'next/navigation';

type Props = {
  payment: Payment;
  onUpdate: (updated: Payment) => void;
  onDelete: (id: string) => void;
};

export function DialogRowActions({ payment, onUpdate, onDelete }: Props) {
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const stock = Number(formData.get('stock'));
    const updated: Payment = {
      id: payment.id,
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      stock,
      status: stock > 0 ? '판매중' : '품절',
    };

    try {
      setLoading(true);
      await updateItem(payment.id, {
        title: updated.title,
        price: updated.price,
        stock: updated.stock,
      });
      onUpdate(updated);
    } catch (err) {
      console.error('수정 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteItem(payment.id);
      onDelete(payment.id);
    } catch (err) {
      console.error('삭제 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductEdit = async (id: string) => {
    route.push(`/shop-manage/item-edit/${id}`);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-10 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-24">
          <DropdownMenuItem onClick={() => handleProductEdit(payment.id)}>
            상품 수정
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2 py-1 text-sm">
                재고 수정
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>상품 삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 수정</DialogTitle>
          <DialogDescription>상품 정보를 수정한 후 저장하세요.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">상품명</label>
            <Input name="title" defaultValue={payment.title} />
          </div>
          <div>
            <label className="text-sm font-medium">가격</label>
            <Input name="price" type="number" defaultValue={payment.price} />
          </div>
          <div>
            <label className="text-sm font-medium">재고</label>
            <Input name="stock" type="number" defaultValue={payment.stock} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              저장
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
