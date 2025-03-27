import ReviewModal from '@/components/mypage/ReviewModal';
import { TabContents } from '@/types/mypageType';
import { formatKoreanDate } from '@/utils/formatDate';
import { ORDER_STATUS } from '@/utils/translateOrderStatus';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  tabContents: TabContents;
  selectedTab: 'orders' | 'reviews_written' | 'reviews_unwritten';
};

export const Cards = ({ tabContents, selectedTab }: CardProps) => {
  if (selectedTab === 'orders') {
    return (
      <>
        <div className="mt-8 grid w-full max-w-4xl grid-rows-3 gap-6">
          {tabContents[selectedTab].map((item, index) => (
            <div key={item.item_id || index} className="flex items-center gap-6">
              <Link href={`/detail/${item.item_id}`} className="relative h-40 w-40 bg-gray-200">
                <Image
                  src={item.items.thumbnail}
                  alt={item.items.title}
                  width={100}
                  height={100}
                  className="h-full w-full rounded-lg object-cover"
                />
              </Link>

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">{item.items.title}</h3>
                <p>주문 상태 : {ORDER_STATUS(item.order_status)}</p>
                <p>수량 : {item.amount}</p>
                <p>주문 일자 : {formatKoreanDate(item.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="mt-8 grid w-full max-w-4xl grid-rows-3 gap-6">
          {tabContents[selectedTab].map((item, index) => (
            <div key={item.item_id || index} className="flex items-center gap-6">
              <div className="relative h-40 w-40 bg-gray-200">
                <Image
                  src={item.items.thumbnail}
                  alt={item.items.title}
                  className="h-full w-full rounded-lg object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">상품명 : {item.items.title}</h3>
                <p>{item.content || '리뷰를 작성해 주세요!'}</p>
                <p>작성 가능 날짜 : {formatKoreanDate(item.created_at)} 로 부터 7일</p>
              </div>
              <ReviewModal
                title={item.items.title}
                imgSrc={item.items.thumbnail}
                reviewId={item.review_id}
                written={item.written}
              />
            </div>
          ))}
        </div>
      </>
    );
};
