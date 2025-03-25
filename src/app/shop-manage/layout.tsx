import { AppSidebar } from '@/components/shop-manage/AppSideBar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default async function SellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      {children}
    </SidebarProvider>
  );
}
