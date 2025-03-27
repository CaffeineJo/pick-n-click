'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/shop-manage/AppSideBar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SellLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sb-svqahkrytqcdumiejdmf-auth-token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    // 아직 인증이 완료되지 않았으므로 로딩 스피너나 빈 컴포넌트를 렌더링
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      {children}
    </SidebarProvider>
  );
}
