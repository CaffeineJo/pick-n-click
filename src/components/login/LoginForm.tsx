'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '@/services/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const formSchema = z.object({
    email: z.string().email({ message: '유효한 이메일을 입력해 주세요.' }),
    password: z.string().min(8, {
      message: '비밀번호는 8자 이상 입력해 주세요.',
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || '로그인 실패');
      }

      alert('로그인 성공');
      router.push('/');
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
                    placeholder="example@exam.com"
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
                  case 'password':
                    label = '비밀번호';
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

        <Button type="submit">로그인</Button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?
            <Link href="/register" className="ml-1 font-medium text-gray-800 hover:text-gray-700">
              회원가입하기
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
