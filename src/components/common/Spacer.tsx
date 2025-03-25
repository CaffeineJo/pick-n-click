import React from 'react';
// 사용시
// <Spacer height={4} /> // h-4 클래스만 적용됨
// <Spacer width={8} height={2} /> // w-8 h-2 클래스 모두 적용됨

type SpacerProps = {
  width?: keyof typeof SPACE_SIZE;
  height?: keyof typeof SPACE_SIZE;
};

const SPACE_SIZE = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  8: '8',
  10: '10',
  12: '12',
  16: '16',
  20: '20',
  24: '24',
  40: '40',
} as const;

const Spacer = ({ width, height }: SpacerProps) => {
  if (!width && !height) return null;

  const widthClass = width ? `w-${SPACE_SIZE[width]}` : '';
  const heightClass = height ? `h-${SPACE_SIZE[height]}` : '';

  // block을 명시적으로 추가
  <div className={`inline-block ${widthClass} ${heightClass}`.trim()} />;
};

export default Spacer;
