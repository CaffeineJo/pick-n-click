import supabase from '@/services/supabase';

//@param id 유저의 uid 값
//@return 해당 유저의 uid 와 일치하는 wishes 내용 전부
export const getWishesByUserId = async (id: string) => {
  const { data, error, status } = await supabase.from('wishes').select('*').eq('uid', id);
  if (error) {
    console.error('getWishesByUserId', error);
    return;
  }
  return data;
};

//@param id 유저의 uid 값, 상품의 item_id 값
//@return 해당 상품에 대한 유저가 wish했는지에 대한 데이터 없으면 빈배열
export const getWishesByUsernItemId = async (id: string, item_id: number) => {
  const { data, error, status } = await supabase
    .from('wishes')
    .select('*')
    .eq('uid', id)
    .eq('item_id', item_id);
  if (error) {
    console.error('getWishesByUsernItemId', error);
    return;
  }
  return data;
};

//@param id 유저의 uid 값, 상품의 id 값
//@return 추가된 seller 데이터 값
export const addWish = async (id: string, item_id: number) => {
  const { data, error, status } = await supabase
    .from('wishes')
    .insert({
      uid: id,
      item: id,
    })
    .select();
  return data;
};

//@param id 유저의 uid 값 상품의 id 값
//@return 삭제결과과
export const deleteWish = async (id: string, item_id: number) => {
  const { data, error, status } = await supabase
    .from('wishes')
    .delete()
    .eq('item_id', id)
    .eq('uid', id);
  return data;
};
