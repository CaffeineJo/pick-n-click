import RegisterForm from '@/components/register/RegisterForm';

export default function SignUpPage() {
  return (
    <>
      <div className="mx-auto mt-20 max-w-md p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">회원가입</h1>
        <RegisterForm />
      </div>
    </>
  );
}
