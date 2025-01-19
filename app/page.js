"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';
import BackgroundIcons from '../components/BackGroundIcons';
import { quotes } from '@/store/Quotes';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const router = useRouter();

  // Check user login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <BackgroundIcons />
      <div className="w-full max-w-lg bg-gray-900 rounded-xl border border-gray-800 p-6 z-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Wallet className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-100">
            Welcome to ExpenseTracker
          </h1>
          <p className="text-lg text-gray-400">
            Take control of your finances, one transaction at a time
          </p>
        </div>

        <div className="my-6 p-4 bg-gray-800 rounded-lg italic text-center text-gray-300">
          {randomQuote}
        </div>

        <div className="flex flex-col gap-2 mt-6">
          {isLoggedIn ? (
            <button
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              onClick={() => navigateTo('/dashboard')}
            >
              Add Payments
            </button>
          ) : (
            <>
              <button
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                onClick={() => navigateTo('/auth/login')}
              >
                Sign In
              </button>
              <button
                className="w-full py-3 px-4 border border-gray-700 hover:bg-gray-800 text-gray-300 font-semibold rounded-lg transition-colors"
                onClick={() => navigateTo('/auth/register')}
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
