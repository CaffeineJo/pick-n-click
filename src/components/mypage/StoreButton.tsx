import { addSeller, getSellerInfo } from '@/api/sellersApi';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type StoreButtonProps = {
  id: string;
};
export const StoreButton = ({ id }: StoreButtonProps) => {
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
    const checkSellerStatus = async () => {
      const data = await getSellerInfo(id);
      if (Array.isArray(data) && data.length === 0) {
        setIsSeller(false);
      } else if (data) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    };

    checkSellerStatus();
  }, [id]);
  const handleStoreRegister = async () => {
    alert('스토어 등록이 완료되었습니다');
    await addSeller(id);
    setIsSeller(true);
  };
  return (
    <>
      {isSeller ? (
        <Link href="/shop-manage">
          <Button className="absolute right-0 top-0">주문관리</Button>
        </Link>
      ) : (
        <Button className="absolute right-0 top-0" onClick={handleStoreRegister}>
          스토어 등록
        </Button>
      )}
    </>
  );
};