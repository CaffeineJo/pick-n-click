'use client';

import { useState, useEffect } from 'react';
import WatchedItems from '@/components/WatchedItems';
import { Item } from '@/types/cartType';

const RecentlyViewedSidebar = () => {
  const [watchedItems, setWatchedItems] = useState<Item[]>([]);

  // 최근 본 상품 로드
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('watchedItems') || '[]');
    setWatchedItems(storedItems);
  }, []);

  if (watchedItems.length === 0) {
    return null;
  }

  return (
    <div
      id="watched-sidebar"
      className="fixed bottom-20 right-0 mr-4 w-40 bg-white p-4 shadow-md transition-all"
    >
      <div className="text-sm font-bold">최근 본 상품</div>
      <WatchedItems items={watchedItems} />
    </div>
  );
};

export default RecentlyViewedSidebar;
