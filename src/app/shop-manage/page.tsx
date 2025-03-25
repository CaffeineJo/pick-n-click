'use client';

import { SiteHeader } from '@/components/shop-manage/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { DataTable } from '@/components/shop-manage/data-table';
import { createColumns } from './columns';
import type { Payment } from './columns';
import { useItemsBySellerId } from '@/hooks/queries/use-items-by-seller-id';
import { useUpdateItem } from '@/hooks/mutate/use-update-item';
import { useDeleteItem } from '@/hooks/mutate/use-delete-item';

const ShopManagePage = () => {
  const { data: paymentList, isLoading, error } = useItemsBySellerId(5);

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  const handleUpdate = (updated: Payment) => {
    updateMutation.mutate(updated);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns = createColumns(handleUpdate, handleDelete);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러가 발생했습니다.</p>;

  return (
    <SidebarInset>
      <SiteHeader headerTitle="내 상품 목록" />
      <DataTable columns={columns} data={paymentList ?? []} />
    </SidebarInset>
  );
};

export default ShopManagePage;
