"use client";

import { FiSun, FiMoon, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './components/ThemeProvider';
import { motion } from 'framer-motion';

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${darkMode ? 'dark bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo.png"
                alt="UniHealth Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              UniHealth
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-[#154734] dark:hover:text-[#2a724f] transition-colors duration-200 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-[#154734] dark:hover:text-[#2a724f] transition-colors duration-200 text-sm font-medium">
              Contact
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-[#154734] dark:hover:text-[#2a724f] transition-colors duration-200"
            >
              {darkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex-grow max-w-6xl mx-auto px-8 py-12 overflow-x-hidden"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col space-y-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 w-full text-center mb-8"
          >
            Hi University students. We know it's hard to get to the doctor. That's where UniHealth comes in.
          </motion.p>
          <div className="flex items-start gap-8 px-4">
            {/* Left side - Flowchart */}
            <div className="flex flex-col items-start flex-shrink-0">

              <div className="flex flex-col items-start gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 w-[300px]"
                >
                  <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Share Symptoms</h3>
                  <p className="text-gray-600 dark:text-gray-300">Enter your symptom into our AI system. Hard to describe them? Tell our AI system.</p>
                </motion.div>
                <div className="flex items-center justify-center w-full">
                  <FiArrowRight className="w-8 h-8 text-[#154734] dark:text-[#2a724f] rotate-90" />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 w-[300px]"
                >
                  <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Get Options</h3>
                  <p className="text-gray-600 dark:text-gray-300">Based on your symptoms, location, and insurance, we provide you options. We understand you're in the dorms and getting to the health clinic 10 miles away isn't easy. It's all factored in. We understand you may not be able to afford the best clinic, we will give you all the options with all the prices.</p>
                </motion.div>
                <div className="flex items-center justify-center w-full">
                  <FiArrowRight className="w-8 h-8 text-[#154734] dark:text-[#2a724f] rotate-90" />
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-all duration-200 w-[300px]"
                >
                  <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">Book Appointment</h3>
                  <p className="text-gray-600 dark:text-gray-300">Get help with just a few clicks. Be it the health center, or the clinic down the road. We will book you with the most optimal provider based on your circumstances. </p>
                </motion.div>
              </div>
            </div>

            {/* Right side - Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-[600px] h-[600px] flex-shrink-0 mt-8 ml-8"
            >
              <Image
                src="/images/example.png"
                alt="Example Image"
                fill
                className="object-scale-down rounded-lg"
                priority
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            onClick={() => window.open('https://forms.gle/gZzn7yWxeodzQtFy7', '_blank')}
            className="mt-8 inline-flex items-center space-x-3 bg-gradient-to-r from-[#154734] to-[#2a724f] dark:from-[#2a724f] dark:to-[#3d8b64] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 shadow-lg group relative overflow-hidden hover:from-[#1d5b44] hover:to-[#154734] dark:hover:from-[#3d8b64] dark:hover:to-[#2a724f]"
          >
            <span>Get Started</span>
            <FiArrowRight className="w-5 h-5 group-hover:transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2025 UniHealth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
