'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/services/supabase';
import { ImageSlider } from '@/components/detail/ImageSlider';
import { AddCartButton } from '@/components/cart/AddCartButton';
import { Loading } from '@/components/detail/Loading'; // 로딩 컴포넌트
import { Error2 } from '@/components/detail/Error';
import { Item } from '@/types/cartType';
import { ReviewList } from '@/components/detail/ReviewList';
import { DetailOrderButton } from '@/components/detail/DetailOrderButton';
import { useState } from 'react';
import { AmountControlButton } from '@/components/cart/AmountControlButton';
import { formatNumber } from '@/utils/formatNumber';

// 특정 상품을 Supabase에서 가져오는 함수
const fetchDetailItem = async (item_id: string | string[]): Promise<Item> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('item_id', Number(item_id))
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export default function DetailPage() {
  const { item_id } = useParams();
  const [amount, setAmount] = useState<number>(1);

  const handleUpAmount = () => {
    setAmount(amount + 1);
  };

  const handleDownAmount = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: ['item', item_id], // item_id 별로 캐싱하는 쿼리키
    queryFn: () => fetchDetailItem(item_id),
    enabled: !!item_id, // 상품 id 없을땐 쿼리 실행 안함
  });

  // 이미지 리스트 파싱 로직 (썸네일 + JSON 이미지 배열)
  const images: string[] = (() => {
    // item이 없다면 빈 배열
    if (!item) return [];
    try {
      const parsed = JSON.parse(item.img_list || '[]'); //문자열을 이미지형태로 파싱
      return [item.thumbnail, ...parsed]; // 썸네일이 맨 앞으로 나오게 함
    } catch {
      return [item.thumbnail]; //파싱 실패 할 경우 썸네일만 표시
    }
  })();

  // 로딩 상태 처리
  if (isLoading) return <Loading />;
  // 에러 상태 처리
  if (isError) return <Error2 message={(error as Error).message} />;

  return (
    <main className="mx-auto max-w-6xl p-4 pt-[100px]">
      {/* 반응형 디자인: 모바일에서는 세로, 데스크탑에서는 가로 */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* 왼쪽: 이미지 섹션 */}
        <div className="md:w-1/2">
          <ImageSlider images={images} />
        </div>

        {/* 오른쪽: 상품 정보 섹션 */}
        <div className="flex flex-col md:w-1/2">
          <div className="flex-grow">
            <h1 className="mb-4 text-2xl font-bold">{item!.title}</h1>
            <p className="mb-2 text-base text-gray-700">{item!.content}</p>
            <p className="mb-6 mt-3 text-lg font-semibold">{formatNumber(item!.price)}원</p>
          </div>
          <div className="my-5">
            <AmountControlButton
              amount={amount}
              handleUpAmount={handleUpAmount}
              handleDownAmount={handleDownAmount}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-3">
            <DetailOrderButton itemId={parseInt(item_id as string)} amount={amount} />
            <AddCartButton id={Number(item_id)} amount={amount} />
          </div>
        </div>
      </div>
      {/* 리뷰 목록 렌더링 */}
      <ReviewList itemId={Number(item_id)} />
    </main>
  );
}
