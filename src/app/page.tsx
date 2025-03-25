'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import supabase from '@/services/supabase';

import { Loading } from '@/components/detail/Loading';
import { Error2 } from '@/components/detail/Error';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Item } from '@/types/cartType';

// Supabase에서 전체 상품 리스트를 불러오는 함수
async function fetchItems(): Promise<Item[]> {
  const { data, error } = await supabase.from('items').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export default function HomePage() {
  const router = useRouter();

  // TanStack Query를 사용해 상품 데이터를 불러옴
  const {
    data: items = [], // 성공 시 상품 배열
    isLoading, // 로딩 중 여부
    isError, // 에러 여부
    error, // 에러 정보
  } = useQuery<Item[]>({
    queryKey: ['items'], // 캐싱을 위한 쿼리 키
    queryFn: fetchItems, // 데이터를 가져올 함수
  });

  //로딩 상태 처리
  if (isLoading) return <Loading />;
  //에러 상태 처리
  if (isError) return <Error2 message={(error as Error).message} />;

  return (
    <main className="mx-auto max-w-4xl p-4 pt-20">
      <h1 className="mb-4 text-lg font-bold">전체 상품</h1>

      {/* 상품 카드 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.item_id}
            className="cursor-pointer"
            onClick={() => router.push(`/detail/${item.item_id}`)} // 동적 라우팅으로 상세 페이지로 이동
          >
            <CardHeader>
              {/* 상품 이미지 */}
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={300}
                height={160}
                className="h-40 w-full rounded object-cover"
              />
              {/* 상품 제목 */}
              <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* 상품 설명 */}
              <p className="text-sm text-gray-700">{item.content}</p>
              {/* 상품 가격 */}
              <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
