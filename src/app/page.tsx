"use client";

import { useState } from 'react';
import './globals.css';

function StartPage() {
  // const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="relative h-screen w-screen bg-purple-400">
      <img
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50"
        alt="main background image"
        src="https://source.unsplash.com/random"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div> 
      <div className="flex h-full w-full absolute justify-center items-center">
        <div className="space-y-8 px-4 text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Easily understand your explanation data on <span className="text-indigo-300">xFlair.</span>
          </h1>
          <p className="text-indigo-100 text-base md:text-lg lg:text-xl">
            Import, capture, and analyze your images for your TensorFlow or PyTorch models.
          </p>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 ease-in-out transform hover:scale-105">
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartPage
