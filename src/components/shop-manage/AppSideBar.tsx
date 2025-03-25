'use client';

import * as React from 'react';
import {
  CameraIcon,
  FileCodeIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  ListIcon,
} from 'lucide-react';
import { NavMain } from '@/components/shop-manage/NavMain';
import { NavUser } from '@/components/shop-manage/NavUser';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
  },
  navMain: [
    {
      title: '내 상품 보기',
      url: '/shop-manage',
      icon: LayoutDashboardIcon,
    },
    {
      title: '주문 목록',
      url: '/shop-manage/orders',
      icon: ListIcon,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: CameraIcon,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: FileTextIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: FileCodeIcon,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props} className="pt-[57px]">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
