'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import supabase from '@/services/supabase';
import ImageUpload from '../common/ImageUpload';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, '상품명을 입력해주세요'),
  stock: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        // 숫자만 남김
        const onlyNums = val.replace(/\D/g, '');
        return onlyNums === '' ? undefined : Number(onlyNums);
      }
      return val;
    },
    z
      .number({ required_error: '재고를 입력해주세요', invalid_type_error: '숫자를 입력해주세요' })
      .min(0, '0 이상이어야 합니다')
      .max(1_000_000, '재고가 너무 많습니다 (1,000,000 이하)'),
  ),
  price: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        const onlyNums = val.replace(/\D/g, '');
        return onlyNums === '' ? undefined : Number(onlyNums);
      }
      return val;
    },
    z
      .number({ required_error: '가격을 입력해주세요', invalid_type_error: '숫자를 입력해주세요' })
      .min(0, '0 이상이어야 합니다')
      .max(1_000_000_000, '가격이 너무 큽니다 (1,000,000,000 이하)'),
  ),
  description: z.string().optional(),
  img_list: z
    .array(z.string().url('유효한 이미지 URL이어야 합니다'))
    .min(1, '최소 1개 이상의 이미지가 필요합니다'),
});

type ItemFormValue = z.infer<typeof formSchema>;

export default function ItemAddForm() {
  const router = useRouter();

  const form = useForm<ItemFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      stock: undefined,
      price: undefined,
      description: '',
      img_list: [],
    },
  });

  const onSubmit = async (data: ItemFormValue) => {
    // 1) 로그인 세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      alert('로그인이 필요합니다');
      return;
    }

    // 2) uid로 sellers 테이블에서 seller_id 조회
    const user = session.user;
    const { data: sellerData, error: sellerError } = await supabase
      .from('sellers')
      .select('seller_id')
      .eq('uid', user.id)
      .single();

    if (sellerError || !sellerData) {
      alert('판매자 정보를 찾을 수 없습니다');
      return;
    }

    const seller_id = sellerData.seller_id;

    // 3) img_list에서 첫 번째 URL을 thumbnail로 분리
    const thumbnail = data.img_list.shift();
    const imgList = data.img_list;

    // 4) 최종 insert 데이터 구성
    const finalData = {
      title: data.name,
      content: data.description,
      price: data.price,
      stock: data.stock,
      seller_id,
      img_list: imgList,
      thumbnail,
    };

    // 5) Supabase items 테이블에 상품 등록
    const { error } = await supabase.from('items').insert(finalData);

    if (error) {
      console.error('상품 등록 실패:', error.message);
      alert('상품 등록 실패: ' + error.message);
    } else {
      alert('상품이 등록되었습니다!');
      router.push('/shop-manage');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 상품명 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품명</FormLabel>
                <FormControl>
                  <Input placeholder="예: 자전거" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 재고, 가격 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>재고</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="재고"
                      value={field.value || ''}
                      onChange={(e) => {
                        // 실시간으로 숫자 이외 제거
                        let onlyNums = e.target.value.replace(/\D/g, '');
                        onlyNums = onlyNums.slice(0, 6);
                        field.onChange(onlyNums);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="가격"
                      value={field.value || ''}
                      onChange={(e) => {
                        let onlyNums = e.target.value.replace(/\D/g, '');
                        onlyNums = onlyNums.slice(0, 9);
                        field.onChange(onlyNums);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 상품 설명 */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품 설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="상품 설명을 입력하세요"
                    {...field}
                    className="min-h-[120px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이미지 업로드 */}
          <FormField
            control={form.control}
            name="img_list"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상품 이미지 업로드</FormLabel>
                <FormControl>
                  <ImageUpload
                    onUpload={(urls: string[]) => {
                      field.onChange(urls);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            상품 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
