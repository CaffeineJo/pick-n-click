'use client';

import { Item } from '@/types/cartType';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatNumber } from '@/utils/formatNumber';
import { cartStore } from '@/store/cartStore';

type CartTotalProps = {
  items: Item[];
};

/**
 * 선택한 아이템의 총 수량, 총 금액을 나타내는 컴포넌트
 * @param CartTotalProps.items - 체크박스로 선택한 아이템 리스트 (수량 포함 X)
 */
export const CartTotal = ({ items }: CartTotalProps) => {
  const storeItems = cartStore((state) => state.items);

  const total = items.reduce(
    (result, item) => {
      result.amount += storeItems[item.id];
      result.price += storeItems[item.id] * item.price;
      return result;
    },
    { amount: 0, price: 0 },
  );

  return (
    <Card className="my-5 w-[300px] self-end">
      <CardHeader>
        <CardTitle className="font-bold">합계</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row justify-between text-sm font-semibold">
          <span className="text-gray-600">총 수량</span>
          <span className="font-bold">{formatNumber(total.amount)}</span>
        </div>
        <div className="flex flex-row justify-between text-sm font-semibold">
          <span className="text-gray-600">총 금액</span>
          <span className="font-bold">{formatNumber(total.price)}원</span>
        </div>
        <Button className="mt-3 font-bold">주문하기</Button>
      </CardContent>
    </Card>
  );
};
