import { useQuery } from '@tanstack/react-query';
import { getReviewsByItemId } from '@/api/reviewsApi';
import { Review } from '@/types/reviewType';
import { CalendarDays } from 'lucide-react';

interface ReviewListProps {
  itemId: number;
}

export const ReviewList = ({ itemId }: ReviewListProps) => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery<Review[]>({
    queryKey: ['reviews', itemId],
    queryFn: () => getReviewsByItemId(itemId),
    enabled: !!itemId,
  });

  if (isLoading) return <p className="text-sm text-gray-500">리뷰 불러오는 중...</p>;
  if (isError) return <p className="text-sm text-red-500">에러: {(error as Error).message}</p>;

  return (
    <section className="mt-14 bg-white rounded-xl p-6 shadow-lg border">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 border-b pb-2">리뷰</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-5">
          {reviews.map((review) => (
            <li
              key={review.review_id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="text-base text-gray-800 leading-relaxed">{review.content}</p>

              <div className="mt-3 flex items-center justify-end text-xs text-gray-500">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(review.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};