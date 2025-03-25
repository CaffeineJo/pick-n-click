import supabase from '@/services/supabase';

//@param id 유저의 uid 값
//@return sellers 테이블의 전체 내용 없을경우 빈배열이 반환됨됨
export const getSellerInfo = async (id: string) => {
  const { data, error, status } = await supabase
    .from('sellers')
    .select('*')
    .eq('uid', id)
    .maybeSingle();
  return { data, error, status };
};

//@param id 유저의 uid 값
//@return 추가된 seller 데이터 값
export const addSeller = async (id: string) => {
  const { data, error, status } = await supabase
    .from('sellers')
    .insert({
      uid: id,
      title: 'title',
      banner: 'banner',
    })
    .select();
  return data;
};
