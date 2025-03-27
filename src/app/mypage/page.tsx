'use client';
import { getUserInfo } from '@/api/usersApi';
import { useEffect, useState } from 'react';
import { getOrderedItemsByBuyerId } from '@/api/orderedItemsApi';
import { getUnWrittenReviewByUserId, getWrittenReviewByUserId } from '@/api/reviewsApi';
import { Orders, Reviews, TabContents, User } from '../../types/mypageType';
import useAuthStore from '@/store/authStore';
import { StoreButton } from '@/components/mypage/StoreButton';
import { Profile } from '@/components/mypage/Profile';
import { Cards } from '@/components/mypage/Card';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.user);
  const userId = userInfo?.id || '';

  useEffect(() => {
    if (!userId) {
      alert('로그인 후 이용해주세요.');
      router.push('/login');
    }
  }, [userId, router]);

  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    introduction: '',
  });
  const [selectedTab, setSelectedTab] = useState<
    'orders' | 'reviews_written' | 'reviews_unwritten'
  >('orders');
  // const userInfo = useAuthStore((state) => state.user);
  // const userId = userInfo?.id || '';

  const [tabContents, setTabContents] = useState<TabContents>({
    orders: [],
    reviews_written: [],
    reviews_unwritten: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUserInfo(userId);
      const user: User = {
        nickname: data?.nickname || '',
        email: data?.email || '',
        introduction: data?.introduction || '',
      };
      setUser(user);
    };
    fetchUsers();
  }, [userId, tabContents]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Orders[] = (await getOrderedItemsByBuyerId(userId)) || [];
        const reviewsWritten: Reviews[] = (await getWrittenReviewByUserId(userId)) || [];
        const reviewsUnwritten: Reviews[] = (await getUnWrittenReviewByUserId(userId)) || [];

        setTabContents({
          orders: orders,
          reviews_written: reviewsWritten,
          reviews_unwritten: reviewsUnwritten,
        });
      } catch (error) {
        console.error('dataFetchingError', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-4xl flex-col items-center p-6">
      <StoreButton id={userId} />
      <Profile user={user} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Cards
        tabContents={tabContents}
        setTabContents={setTabContents}
        selectedTab={selectedTab}
      ></Cards>
    </div>
  );
}
