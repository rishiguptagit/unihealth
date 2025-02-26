"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation Bar */}
      <nav className="bg-transparent p-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 pt-20 pb-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
            Student Health Portal
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Your comprehensive healthcare companion for campus life. Access medical services, schedule appointments,
            and manage your health information all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Easy Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">Book appointments with healthcare providers in just a few clicks</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Health Resources</h3>
              <p className="text-gray-600 dark:text-gray-300">Access important health information and educational materials</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-300">Get help whenever you need it with our support services</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="mt-12 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <span>Access Portal</span>
            <FiArrowRight className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 bg-transparent">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Student Health Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
