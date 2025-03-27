'use client';

import React from 'react';
import supabase from '@/services/supabase';
import { useRouter } from 'next/navigation';
import { GoogleLoginBtn } from './GoogleLoginBtn';
const SocialLoginForm = () => {
  const router = useRouter();
  const onGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (data) alert('로그인 성공');
      if (error) {
        throw new Error(error.message || '로그인 실패');
      }
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
    <>
      <GoogleLoginBtn onGoogleLogin={onGoogleLogin} />
    </>
  );
};

export default SocialLoginForm;
