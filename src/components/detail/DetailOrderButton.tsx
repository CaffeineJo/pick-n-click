import supabase from '@/services/supabase';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const DetailOrderButton = ({ itemId, amount }: { itemId: number; amount: number }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  /** 디테일 페이지용 주문하기 버튼 클릭 리스너 */
  const handleClickOrder = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }
    const isConfirmed = confirm('주문하시겠습니까?');
    if (!isConfirmed) return;

    try {
      // 유저의 uuid 가져오기
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userError) throw new Error(userError.message);

      const orderData = {
        item_id: itemId,
        buyer_id: userId,
        amount: amount,
        created_at: new Date(),
        order_status: 'pending',
      };

      const { error: itemError } = await supabase.from('ordered_items').insert(orderData);
      if (itemError) throw new Error(itemError.message);

      alert('주문이 완료되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button className="w-full" variant="outline" onClick={handleClickOrder}>
      주문하기
    </Button>
  );
};
