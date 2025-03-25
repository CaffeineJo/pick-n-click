'use client';
import { getUserInfo } from '@/api/usersApi';
import { useEffect, useState } from 'react';
import { Cards } from './_components/Card';
import { getOrderedItemsByBuyerId } from '@/api/orderedItemsApi';
import { getReviewByUserId } from '@/api/reviewsApi';
import { Profile } from './_components/Profile';
import { StoreButton } from './_components/StoreButton';
import { Orders, Reviews, TabContents, User } from './_types/type';

export default function MyPage() {
  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    introduction: '',
  });
  const [selectedTab, setSelectedTab] = useState<
    'orders' | 'reviews_written' | 'reviews_unwritten'
  >('orders');
  const userId = '5360358d-5de7-43f7-8998-58f02b79a46c';

  const [tabContents, setTabContents] = useState<TabContents>({
    orders: [],
    reviews_written: [],
    reviews_unwritten: [],
  });

  useEffect(() => {
    async function fetchUsers() {
      const data: User = (await getUserInfo(userId)) || {
        nickname: '',
        email: '',
        introduction: '',
      };
      setUser(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders: Orders[] = (await getOrderedItemsByBuyerId(userId)) || [];
        const reviewsWritten: Reviews[] = (await getReviewByUserId(userId)) || [];
        const reviewsUnwritten: Reviews[] = (await getReviewByUserId(userId)) || [];

        setTabContents({
          orders: orders,
          reviews_written: reviewsWritten || [],
          reviews_unwritten: reviewsUnwritten || [],
        });
      } catch (error) {
        console.error('Unexpected error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-4xl flex-col items-center p-6">
      <StoreButton id={userId} />
      <Profile user={user} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Cards tabContents={tabContents} selectedTab={selectedTab}></Cards>
    </div>
  );
}
