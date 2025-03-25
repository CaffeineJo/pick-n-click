import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import Providers from './providers';
import AuthListener from '@/components/AuthListener';

export const metadata: Metadata = {
  title: 'Pick n Click',
  description: '고르고 클릭하여 골라 담는 쇼핑몰',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthListener />
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
