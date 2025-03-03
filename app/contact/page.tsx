"use client";

import { useState } from 'react';
import { FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';

export default function Contact() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.question.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', question: '' });
    } catch (_err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-6">Contact Us</h1>
          
          <p className="text-lg leading-relaxed">
            Have a question about CPHealth? We&apos;re here to help! Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl mt-8">
            {submitted ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">Thank You!</h2>
                <p className="text-gray-600 dark:text-gray-300">We&apos;ve received your question and will get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Submit another question
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="What would you like to know about CPHealth?"
                  />
                </div>
                {error && (
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                >
                  Submit Question
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
