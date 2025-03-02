"use client";

import { FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';

export default function Contact() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-transparent py-6 w-full">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-lg font-medium ml-6 group"
          >
            <FiArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
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
      <main className="max-w-4xl mx-auto px-8 py-16">
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-6">Contact Us</h1>
          
          <p className="text-lg leading-relaxed">
            We'd love to hear from you! Whether you're a student interested in using our platform,
            a healthcare provider looking to partner with us, or just want to learn more about what we do.
          </p>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl mt-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">contact@cphealth.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">Cal Poly, San Luis Obispo, CA 93407</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">Office Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 5:00 PM PST</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
