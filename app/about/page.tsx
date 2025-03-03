"use client";


import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';

export default function About() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-transparent py-6 w-full">
        <div className="max-w-4xl mx-auto px-8 flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-lg font-medium group"
          >
            <FiArrowLeft className="w-5 h-5 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-8 py-16">
        {/* About Content */}
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-6">About CPHealth</h1>
          
          <p className="text-lg leading-relaxed">
            CPHealth is a concept that was born out of BUS 310 at Cal Poly, San Luis Obispo. Our journey began at Cal Poly, where we witnessed firsthand the challenges students face in 
            accessing and affording healthcare. We want to solve this problem through technology and innovation.
          </p>

          <h2 className="text-2xl font-semibold text-black dark:text-white mt-8 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We&apos;re on a mission to make healthcare accessible, affordable, and transparent for every student.
            By leveraging AI and local healthcare partnerships, we provide personalized healthcare solutions
            that fit students&apos; busy lives and budgets.
          </p>

          <h2 className="text-2xl font-semibold text-black dark:text-white mt-8 mb-4">How We Help</h2>
          <p className="text-lg leading-relaxed">
            Symptom to help. Our platform will use your symptoms to find the best healthcare options for you.
            Find you the best doctor, lab, and pharmacy for your needs. We will take into account costs, geolocation, and availability when making your choices.
          </p>
        </div>
      </main>
    </div>
  );
}
