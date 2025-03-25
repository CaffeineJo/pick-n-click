/**
 * 숫자를 넣으면 콤마를 추가해서 반환하는 함수입니다.
 * @param value - 포맷팅할 숫자
 * @returns 포맷팅한 숫자
 * @example
 * ```typescript
 * formatNumber(100000) // 100,000
 * ```
 */
export const formatNumber = (value: number): string => {
  if (value === null || value === undefined) return '';
  return value.toLocaleString('ko-KR');
};
