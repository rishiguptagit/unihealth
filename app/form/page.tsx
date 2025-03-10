"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../components/ThemeProvider';

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { darkMode, toggleDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    interestedInBeta: '',
    features: {
      cancellationNotifications: false,
      appointmentReminders: false,
      prescriptionReminders: false,
      symptomAnalysis: false,
      other: false
    },
    otherFeature: ''
  });

  useEffect(() => {
    const email = searchParams.get('email');
    if (!email) {
      // If no email is provided, redirect back to home page
      router.push('/');
    }
  }, [searchParams, router]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    const email = searchParams.get('email');
    
    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // After successful submission, redirect to POC page
      router.push('/poc');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                alt="UniHealth"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">UniHealth</span>
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
      </nav>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
        <div className="px-6 py-8 sm:px-10">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">Welcome to UniHealth</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Help us build the future of healthcare management</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Beta Interest Question */}
            <div className="space-y-3">
              <label className="block text-gray-700 dark:text-gray-200 font-medium">
                Are you interested in being contacted when the beta version of UniHealth is released?
              </label>
              <div className="space-y-2">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200">
                    <input
                      type="radio"
                      name="betaInterest"
                      value={option}
                      checked={formData.interestedInBeta === option}
                      onChange={(e) => setFormData({ ...formData, interestedInBeta: e.target.value })}
                      className="form-radio h-4 w-4 text-[#154734] dark:text-[#2a724f] focus:ring-[#154734] dark:focus:ring-[#2a724f]"
                      required
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center">
                UniHealth is still under active development. Please let us know which features interest you the most.
              </p>
            </div>

            {/* Features Question */}
            <div className="space-y-3">
              <label className="block text-gray-700 dark:text-gray-200 font-medium">
                Which features would you like to see on the app?
              </label>
              <div className="space-y-2">
                {[
                  { id: 'cancellationNotifications', label: 'Cancellation notification list' },
                  { id: 'appointmentReminders', label: 'Reminders for scheduling personal appointments' },
                  { id: 'prescriptionReminders', label: 'Prescription Reminders' },
                  { id: 'symptomAnalysis', label: 'AI Symptom Analysis' },
                  { id: 'other', label: 'Other' }
                ].map(({ id, label }) => (
                  <div key={id} className="space-y-2">
                    <label key={id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features[id as keyof typeof formData.features]}
                        onChange={(e) => setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            [id]: e.target.checked
                          }
                        })}
                        className="form-checkbox h-4 w-4 text-[#154734] dark:text-[#2a724f] rounded focus:ring-[#154734] dark:focus:ring-[#2a724f]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                    {id === 'other' && formData.features.other && (
                      <textarea
                        value={formData.otherFeature}
                        onChange={(e) => setFormData({
                          ...formData,
                          otherFeature: e.target.value
                        })}
                        placeholder="What other features would you like to see?"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#154734] dark:focus:ring-[#2a724f] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        rows={3}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#154734] dark:bg-[#2a724f] text-white rounded-lg hover:bg-[#1d5f45] dark:hover:bg-[#358f63] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
              {submitError && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
