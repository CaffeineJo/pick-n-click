'use client';

import { useEffect } from 'react';
import supabase from '@/services/supabase';
import useAuthStore from '@/store/authStore';

const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
};

export default function AuthListener() {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === AUTH_EVENTS.SIGNED_IN || event === AUTH_EVENTS.TOKEN_REFRESHED)) {
        login(
          {
            id: session.user.id,
            email: session.user.email!,
            nickname: session.user.user_metadata?.nickname || '',
          },
          session.access_token,
          session.refresh_token,
        );
      } else if (!session || event === AUTH_EVENTS.SIGNED_OUT) {
        logout();
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [login, logout]);

  return null;
}
