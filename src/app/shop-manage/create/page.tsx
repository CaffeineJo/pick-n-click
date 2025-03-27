'use client';

import ItemAddForm from '@/components/shop-manage/ItemAddForm';
import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const user = useAuthStore((state) => state.user);

  const router = useRouter();
  if (!user) {
    alert('로그인 후 이용해주세요.');
    router.push('/login');
    return;
  }
  return (
    <SidebarInset>
      <SiteHeader headerTitle="상품 추가하기" />
      <ItemAddForm />
    </SidebarInset>
  );
}
