import supabase from '@/services/supabase';

//@param id 상품의 id 값
//@return 해당 상품에 대한 리뷰 정보 모두
export const getReviewsByItemId = async (id: number) => {
  const { data, error, status } = await supabase
    .from('reviews')
    .select(
      `
      review_id,
      uid,
      item_id,
      content,
      created_at
    `,
    )
    .eq('item_id', id);
  return data;
};

//@param id user의 uid 정보
//@return 해당 유저의 review 정보 모두
export const getReviewByUserId = async (id: string) => {
  const { data, error, status } = await supabase.from('reviews').select('*').eq('uid', id);

  return data;
};

//@param id user의 uid 정보가 포함된 review 데이터
//@return 추가된 review 데이터 값
export const addOrderedItems = async (review: review) => {
  const { data, error, status } = await supabase.from('reviews').insert([review]).select();
  return data;
};

//@param 삭제할 리뷰의 review_id 값
//@return 삭제 결과
export const deleteOrderItems = async (id: number) => {
  const { data, error, status } = await supabase.from('reviews').delete().eq('review_id', id);
  return data;
};
