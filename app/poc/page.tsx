"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSun, FiMoon, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../components/ThemeProvider';

export default function POC() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleContinue = () => {
    router.push('/info');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="UniHealth Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">UniHealth</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-[#154734] dark:hover:text-[#2a724f] transition-colors duration-200 text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-[#154734] dark:hover:text-[#2a724f] transition-colors duration-200 text-sm font-medium">
                Contact
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </motion.button>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Continue to see a UniHealth POC
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Experience an interactive preview of our healthcare management platform
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="flex items-center justify-center space-x-2 w-full py-3.5 bg-[#154734] dark:bg-[#2a724f] text-white rounded-lg hover:bg-[#1d5f45] dark:hover:bg-[#358f63] transition-colors duration-200 font-medium"
            >
              <span>Continue</span>
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}