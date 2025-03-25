import LoginForm from '@/components/login/LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">로그인</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
