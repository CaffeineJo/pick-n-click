import React from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

type GoogleLoginBtnProps = {
  onGoogleLogin: () => void;
};

export const GoogleLoginBtn: React.FC<GoogleLoginBtnProps> = ({ onGoogleLogin }) => {
  return (
    <Button className="w-full" variant="outline" onClick={onGoogleLogin}>
      <FcGoogle style={{ marginRight: '8px' }} />
      구글로 시작하기
    </Button>
  );
};
