'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import ImageUpload from '@/components/common/ImageUpload';
import { getItemById } from '@/api/itemsApi';

// ─────────────────────────────────────────────────────────────────────────
// 1) zod 스키마 (등록/수정 모두 동일한 데이터 구조)
// ─────────────────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(1, '상품명을 입력해주세요'),
  stock: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
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

// ─────────────────────────────────────────────────────────────────────────
// 2) 수정 페이지 컴포넌트
// ─────────────────────────────────────────────────────────────────────────
export default function ItemEditPage() {
  const router = useRouter();
  const params = useParams(); // 예: { itemId: '110' }
  const itemId = params.itemId;

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

  // 3) 마운트 시 DB에서 상품 데이터 가져와서 폼에 초기값 세팅
  useEffect(() => {
    const fetchItem = async () => {
      const data = await getItemById(Number(itemId));
      if (!data || data.length === 0) {
        alert('존재하지 않는 상품이거나 오류가 발생했습니다.');
        router.push('/shop-manage');
        return;
      }
      const item = data[0];

      // DB에 저장된 img_list가 JSON 문자열이라면 파싱 (예: '["url1", "url2"]')
      let parsedImgList: string[] = [];
      try {
        parsedImgList =
          typeof item.img_list === 'string' ? JSON.parse(item.img_list) : item.img_list;
      } catch (error) {
        console.error('img_list 파싱 실패:', error);
      }

      // 썸네일은 item.thumbnail, 나머지는 parsedImgList
      const defaultImages = [item.thumbnail, ...parsedImgList].filter(Boolean);

      form.reset({
        name: item.title || '',
        stock: item.stock ?? 0,
        price: item.price ?? 0,
        description: item.content || '',
        img_list: defaultImages,
      });
    };

    fetchItem();
  }, [itemId, router, form]);

  // 4) 폼 제출 시 업데이트 로직
  const onSubmit = async (data: ItemFormValue) => {
    // 로그인/세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      alert('로그인이 필요합니다');
      return;
    }

    // seller_id 조회
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

    // img_list에서 첫 번째 이미지를 thumbnail, 나머지를 img_list로 분리
    const [thumbnail, ...restImages] = data.img_list;

    const finalData = {
      title: data.name,
      content: data.description,
      price: data.price,
      stock: data.stock,
      seller_id,
      img_list: restImages,
      thumbnail,
    };

    // DB 업데이트 (item_id 컬럼 기준)
    const { error: updateError } = await supabase
      .from('items')
      .update(finalData)
      .eq('item_id', itemId);

    if (updateError) {
      console.error('상품 수정 실패:', updateError.message);
      alert('상품 수정 실패: ' + updateError.message);
    } else {
      alert('상품이 수정되었습니다!');
      router.push('/shop-manage');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 5) 렌더링: 수정 폼 (ImageUpload 컴포넌트는 defaultImages로 img_list 전달)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-10">
      <h2 className="mb-4 text-xl font-bold">상품 수정</h2>
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
                    defaultImages={field.value || []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            상품 수정 완료
          </Button>
        </form>
      </Form>
    </div>
  );
}
