'use client';

import ItemAddForm from '@/components/shop-manage/ItemAddForm';
import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';

export default function CreateProductPage() {
  return (
    <SidebarInset>
      <SiteHeader headerTitle="상품 추가하기" />
      <ItemAddForm />
    </SidebarInset>
  );
}
