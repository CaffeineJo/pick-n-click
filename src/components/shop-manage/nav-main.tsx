'use client';

import { useRouter, usePathname } from 'next/navigation';
import { PlusCircleIcon, type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickCreate = () => {
    router.push('/shop-manage/create');
  };

  const handleClickMenu = (url: string) => () => {
    router.push(url);
  };

  return (
    <SidebarGroup className="mt-5">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              onClick={handleClickCreate}
            >
              <PlusCircleIcon />
              <span>상품 추가하기</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={handleClickMenu(item.url)}
                  className={
                    isActive
                      ? 'bg-gray-300 font-semibold text-foreground hover:bg-gray-300'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
