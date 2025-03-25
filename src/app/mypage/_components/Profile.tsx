import { User } from '../_types/type';

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

        <div className="mt-6 flex w-full max-w-3xl justify-around border-b pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-lg font-bold ${
                selectedTab === tab.key
                  ? 'border-b-4 border-blue-500 text-blue-500'
                  : 'text-gray-500'
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
