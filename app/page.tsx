"use client";

import { FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from './components/ThemeProvider';

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation Bar */}
      <nav className="bg-transparent py-6 w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8 ml-6">
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-lg font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-lg font-medium">
              Contact
            </Link>
          </div>
          <div className="mr-8">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 pt-20 pb-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white">
            CPHealth
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
            We are revolutionizing healthcare access for Cal Poly students and students across the world. Technology is the key to optimizing healthcare, and we&apos;re here to help.
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mt-3">
            We understand cost is a major concern - that&apos;s why we find you all available healthcare options in San Luis Obispo, provide estimated costs, and help you choose the best option for your needs. No bs, just facts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">End to End Health Solution</h3>
              <p className="text-gray-600 dark:text-gray-300">Provide a symptom, and we&apos;ll provide you optimal health care options and costs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Campus-Integrated Care</h3>
              <p className="text-gray-600 dark:text-gray-300">Seamlessly connect with Cal Poly health services, counseling center, and wellness resources in one platform</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 hover:transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Smart Health Companion</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-powered health recommendations and reminders tailored to your academic schedule and campus life</p>
            </div>

          </div>
          <button
            onClick={() => {
              window.open('https://forms.gle/gZzn7yWxeodzQtFy7', '_blank');
              window.location.href = '/dashboard';
            }}
            className="mt-12 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <span>Get Started</span>
            <FiArrowRight className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 bg-transparent">
        <div className="max-w-6xl mx-auto px-8 text-center text-gray-600 dark:text-gray-400">
          <p> 2025 CPHealth Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
