'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Item {
  item_id: number;
  title: string;
  content: string;
  thumbnail: string;
  price: number;
}

export default function HomePage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Supabase에서 상품 데이터 불러오기
    const fetchItems = async () => {
      const { data, error } = await supabase.from('items').select('*');
      console.log('받아온 데이터:', data);
      if (error) {
        console.error('상품 불러오기 실패:', error.message);
        return;
      }
      setItems(data || []);
    };

    fetchItems();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-4 pt-20">
      <h1 className="mb-4 text-lg font-bold">전체 상품</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.item_id}
            className="cursor-pointer"
            onClick={() => router.push(`/detail/${item.item_id}`)} // 클릭 시 상세 페이지로 이동
          >
            <CardHeader>
              {/* 상품 썸네일 이미지 */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 w-full rounded object-cover"
              />
              <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{item.content}</p>
              <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
