import { cartStore } from '@/store/cartStore';
import { Button } from '../ui/button';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabase';

type OrderButtonProps = {
  itemIds: number[];
};

/**
 * 주문하기 버튼 컴포넌트
 * @param OrderButtonProps.itemIds - 주문할 상품의 id 배열
 */
export const OrderButton = ({ itemIds }: OrderButtonProps) => {
  const storeItems = cartStore((state) => state.items);
  const removeItem = cartStore((state) => state.removeItem);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  /** 주문하기 버튼 클릭 리스너 */
  const handleClickOrder = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
    const isConfirmed = confirm('주문하시겠습니까?');
    if (!isConfirmed) return;

    try {
      // 유저의 uuid 가져오기
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const userId = user?.id;

      if (error) throw new Error(error.message);

      // 아이템 순회하면서 DB에 저장
      itemIds.forEach(async (item) => {
        const orderData = {
          item_id: item,
          buyer_id: userId,
          amount: storeItems[item],
          created_at: new Date(),
          order_status: 'pending',
        };

        const { error } = await supabase.from('ordered_items').insert(orderData);
        if (error) throw new Error(error.message);

        // 주문한 아이템 삭제
        alert('주문이 완료되었습니다.');
        removeItem(itemIds.map((id) => id.toString()));
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClickOrder} className="mt-3 font-bold">
      주문하기
    </Button>
  );
};
