import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

const OrderPage = () => {
  return (
    <SidebarInset>
      <SiteHeader headerTitle="주문 목록" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6"></div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default OrderPage;
