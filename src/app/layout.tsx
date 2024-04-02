'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import tailwind from 'tailwindcss';

import { useState } from 'react';
import Sidenav from './ui/Sidenav';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang='en'>
      <Head>
        <title>xFlair Demo</title>
        <meta name='description' content='A demo for xFlair' />
      </Head>
      <body>
        <main className={inter.className}>
          <div className='flex h-screen min-w-screen bg-black'>
            <Sidenav
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <div
              className={`flex-1 transition-all duration-300 h-full ${
                sidebarOpen ? 'lg:ml-64' : 'ml-0'
              } flex flex-col`}
            >
              <button
                type='button'
                className='text-gray-500 hover:text-gray-600 p-4'
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className='sr-only'>Toggle Navigation</span>
                <svg
                  className='flex-shrink-0 size-4'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                  />
                </svg>
              </button>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
