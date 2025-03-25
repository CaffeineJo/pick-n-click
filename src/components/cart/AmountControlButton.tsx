'use client';

import { formatNumber } from '@/utils/formatNumber';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

type AmountControlButtonProps = {
  amount: number;
  handleUpAmount: () => void;
  handleDownAmount: () => void;
};

/**
 * [+], [-] 버튼으로 수량을 조절하는 컴포넌트
 * handleUpAmount, handleDownAmount 함수는 외부에서 전달해야 합니다.
 */
export const AmountControlButton = ({
  amount,
  handleUpAmount,
  handleDownAmount,
}: AmountControlButtonProps) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Button variant="outline" size="icon" onClick={handleDownAmount}>
        <Minus />
      </Button>
      <span>{formatNumber(amount)}</span>
      <Button variant="outline" size="icon" onClick={handleUpAmount}>
        <Plus />
      </Button>
    </div>
  );
};
