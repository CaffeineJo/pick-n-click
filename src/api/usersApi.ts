import supabase from '@/services/supabase';

//@param user의 uid값
//@return user의 nickname introduction email 값값
export const getUserInfo = async (id: string) => {
  const { data, error, status } = await supabase
    .from('users')
    .select('email,nickname,introduction')
    .eq('uid', id)
    .single();
  console.log(data);
  return data;
};
