'use client';

import { User } from '@/types/mypageType';

type ProfileProps = {
  user: User;
  selectedTab: 'orders' | 'reviews_written' | 'reviews_unwritten';
  setSelectedTab: (tab: 'orders' | 'reviews_written' | 'reviews_unwritten') => void;
};

export const Profile = ({ user, selectedTab, setSelectedTab }: ProfileProps) => {
  const tabs: { key: 'orders' | 'reviews_written' | 'reviews_unwritten'; label: string }[] = [
    { key: 'orders', label: '주문 배송' },
    { key: 'reviews_written', label: '작성한 후기' },
    { key: 'reviews_unwritten', label: '작성 가능한 후기' },
  ];

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 mt-12 text-center">
          <h2 className="text-3xl font-bold">{user?.nickname}</h2>
          <p className="text-lg text-muted-foreground">{user?.email}</p>
          <p className="text-muted-foreground">{user?.introduction}</p>
        </div>

        <div className="mt-6 flex inline-flex h-10 w-full max-w-xl items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
                selectedTab === tab.key ? 'rounded-lg bg-white text-black' : ''
              }`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
