'use server';

import Link from "next/link";

export default async function Home() {
  return (
    <div className='flex flex-col justify-evenly items-center'>
      <img
        className='h-1/4 w-1/4 object-contain'
        src='/logoBlack.png'
        alt='titleText'
      />
      <h1 className='text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight'>
        Coming Soon
      </h1>
      <p className='text-white text-base md:text-lg lg:text-xl'>
        Feature still in progress. We apologize for the inconvenience.
      </p>
      <Link
        className='bg-amber-500 hover:bg-amber-300 text-white hover:text-black font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out transform hover:scale-105'
        href={'/'}
      >
        Return to Homepage
      </Link>
    </div>
  );
}
