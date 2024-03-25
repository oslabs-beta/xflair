import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from './ui/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'xFlair Demo',
  description: 'A demo for xFlair',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div style = {{display: 'flex', minHeight: '100vh'}}>
        <Sidebar />
        <main style = {{flex: 1, padding: '20px'}}>
        {children}
        </main>
        </div>
        </body>
    </html>
  );
}
