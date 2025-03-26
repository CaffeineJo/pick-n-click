'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import supabase from '@/services/supabase';
import { Item } from '@/types/cartType';
import { Loading } from '@/components/detail/Loading';
import { Error2 } from '@/components/detail/Error';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import RecentlyViewedSidebar from '@/components/RecentlyViewedSidebar';

// Supabase에서 전체 상품 리스트를 불러오는 함수
async function fetchItems(): Promise<Item[]> {
  const { data, error } = await supabase.from('items').select('*');
  if (error) throw new Error(error.message);
  return data || [];
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // TanStack Query를 사용해 상품 데이터를 불러옴
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery<Item[]>({
    queryKey: ['items'], // 쿼리 키: 캐시 식별용
    queryFn: fetchItems, // 데이터를 가져올 함수
  });

  // 로딩 상태 처리
  if (isLoading) return <Loading />;
  // 에러 상태 처리
  if (isError) return <Error2 message={(error as Error).message} />;

  // 검색어로 필터링된 상품 리스트
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleItemClick = (item: Item) => {
    const watchedItems: Item[] = JSON.parse(localStorage.getItem('watchedItems') || '[]');
    const updatedItems = [item, ...watchedItems.filter((i) => i.item_id !== item.item_id)];
    localStorage.setItem('watchedItems', JSON.stringify(updatedItems));
    router.push(`/detail/${item.item_id}`);
  };

  return (
    <>
      <main className="mx-auto max-w-4xl p-4 pt-20">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-bold">
          {searchQuery ? `"${searchQuery}" 검색 결과` : '전체 상품'}
        </h1>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="찾는 상품을 검색 해보세요!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9" // 아이콘만큼 왼쪽 패딩 추가
          />
        </div>
      </div>

      {/* 상품 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredItems.map((item) => (
          <Card
            key={item.item_id}
            className="relative cursor-pointer"
            onClick={() => handleItemClick(item)} // 상세 페이지로 이동 및 최근 본 상품에 추가
          >
            <CardHeader>
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={300}
                height={160}
                className="h-40 w-full rounded object-cover"
              />
              <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
            </CardHeader>

              <CardContent className="pb-10">
                <div className="flex flex-col gap-2">
                  <p className="line-clamp-2 text-sm text-gray-700">{item.content}</p>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-base font-semibold text-black">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
              </div>
              </CardContent>

            <ShoppingBasket
              className="absolute bottom-2 right-2 h-6 w-6 text-grey-500 transition hover:text-grey-600"
            />
            </Card>
          ))}
        </div>
      </main>
      <RecentlyViewedSidebar items={items} />
    </>
  );
}
