'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabase';

export default function RegisterForm() {
  const formSchema = z
    .object({
      email: z.string().email({ message: '유효한 이메일을 입력해 주세요.' }),
      password: z.string().min(8, {
        message: '비밀번호는 8자 이상 입력해 주세요.',
      }),
      passwordConfirm: z.string().min(8, { message: '비밀번호를 다시 입력해 주세요.' }),
      nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상 입력해 주세요.' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordConfirm'],
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { email, password, nickname } = data;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname },
        },
      });

      if (error) {
        throw new Error(error.message || '회원가입 실패');
      }

      alert('회원가입이 완료되었습니다.');
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 오류 발생');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            const error = form.formState.errors[field.name];
            return (
              <FormItem>
                <FormLabel className="!text-black">이메일</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="example@exam.com"
                    className={`${error ? '!focus:border-red-500 !border-red-500' : ''}`}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => {
            const error = form.formState.errors[field.name];
            return (
              <FormItem>
                <FormLabel className="!text-black">닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder="최소 2자 이상 입력해 주세요."
                    {...field}
                    className={`${error ? '!focus:border-red-500 !border-red-500' : ''}`}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            const error = form.formState.errors[field.name];
            return (
              <FormItem>
                <FormLabel className="!text-black">비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="최소 8자 이상 입력해 주세요."
                    {...field}
                    type="password"
                    className={`${error ? '!focus:border-red-500 !border-red-500' : ''}`}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => {
            const error = form.formState.errors[field.name];
            return (
              <FormItem>
                <FormLabel className="!text-black">비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className={`${error ? '!focus:border-red-500 !border-red-500' : ''}`}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        {/* 에러메세지 모아서 표시 */}
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="text-sm text-red-500">
            <ul className="list-inside list-disc">
              {Object.entries(form.formState.errors).map(([fieldName, error]) => {
                let label = '';
                switch (fieldName) {
                  case 'email':
                    label = '이메일';
                    break;
                  case 'nickname':
                    label = '닉네임';
                    break;
                  case 'password':
                    label = '비밀번호';
                    break;
                  case 'passwordConfirm':
                    label = '비밀번호 확인';
                    break;
                  default:
                    label = fieldName;
                }
                return (
                  <li key={fieldName}>
                    <strong>{label}:</strong> {error.message}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <Button type="submit">가입하기</Button>
      </form>
    </Form>
  );
}
