import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatKoreanDate = (date: string): string => {
  return format(date, 'yyyy-MM-dd (HH시 mm분)', { locale: ko });
};
