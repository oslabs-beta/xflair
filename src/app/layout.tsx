import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>xFlair Demo</title>
        <meta name="description" content="A demo for xFlair" />
        {/* Any other head elements like external stylesheets */}
      </Head>
      <main className={inter.className}>
        {children}
      </main>
    </>
  );
}