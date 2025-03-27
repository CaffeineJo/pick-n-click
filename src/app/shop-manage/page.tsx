'use client';

import { useEffect, useState } from 'react';

import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';

import type { Payment } from './columns';

import { useUpdateItem } from '@/hooks/mutate/useUpdateItem';
import { useDeleteItem } from '@/hooks/mutate/useDeleteItem';
import { useItemsBySellerId } from '@/hooks/queries/useItemsBySellerId';

import useAuthStore from '@/store/authStore';
import { getSellerInfo } from '@/api/sellersApi';
import { DataTableWithSearch } from '@/components/shop-manage/DataTableWithSearch';
import { useRouter } from 'next/navigation';

export default function ShopManagePage() {
  const user = useAuthStore((state) => state.user);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [isSellerLoading, setIsSellerLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchSellerId = async () => {
      if (!user) {
        alert('로그인 후 이용해주세요.');
        router.push('/login');
        return;
      }
      try {
        const data = await getSellerInfo(user.id);
        setSellerId(data?.seller_id ?? null);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSellerLoading(false);
      }
    };

    fetchSellerId();
  }, [user]);

  const {
    data: paymentList,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useItemsBySellerId(sellerId ?? 0, {
    enabled: sellerId !== null && !isSellerLoading,
  });

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  if (!user || isSellerLoading || isPaymentLoading) {
    return <p>로딩 중...</p>;
  }

  if (paymentError) {
    return <p>에러가 발생했습니다.</p>;
  }

  const handleUpdate = (updated: Payment) => {
    updateMutation.mutate(updated);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <SidebarInset>
      <SiteHeader headerTitle="내 상품 목록" />
      <DataTableWithSearch
        data={paymentList ?? []}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </SidebarInset>
  );
}
