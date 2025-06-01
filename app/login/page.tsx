"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Login() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement actual login logic here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      router.push('/chat');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${darkMode ? 'dark bg-black' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto px-3 sm:px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/images/logo.png"
                alt="UniHealth Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-black dark:text-white">
              UniHealth
            </h1>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {darkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 bg-white dark:bg-[#111111] p-8 rounded-2xl shadow-lg dark:shadow-white/5"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-4 py-3 rounded-xl border-2 ${
                    error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-800'
                  } bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`mt-1 block w-full px-4 py-3 rounded-xl border-2 ${
                    error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-800'
                  } bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 dark:text-red-400 text-center">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </motion.button>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
              </span>
              <Link
                href="/signup"
                className="font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                Sign up
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
