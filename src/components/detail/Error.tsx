interface ErrorProps {
    message: string;
  }
  
  export function Error2({ message }: ErrorProps) {
    return <p className="text-center mt-20 text-red-500">에러 발생: {message}</p>;
  }