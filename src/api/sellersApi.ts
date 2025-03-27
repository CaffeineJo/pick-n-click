import supabase from '@/services/supabase';

//@param id 유저의 uid 값
//@return sellers 테이블의 전체 내용 없을경우 빈배열이 반환됨
// 유저의 uid로 seller id를 찾기
export const getSellerInfo = async (uid: string) => {
  const { data, error } = await supabase
    .from('sellers')
    .select('seller_id')
    .eq('uid', uid)
    .maybeSingle();

  if (error) throw new Error('유저의 스토어 정보를 가져오는 도중 오류가 발생했습니다.');
  return data;
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
  if (error) console.error('addSeller', error, status);
  return data;
};