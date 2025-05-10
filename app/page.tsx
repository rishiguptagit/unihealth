"use client";

import { FiSun, FiMoon } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const { darkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);


  const studentProfiles = [
    { src: "/images/student1.jpg", alt: "Female student with headache" },
    { src: "/images/student2.jpg", alt: "Student dealing with stress" },
    { src: "/images/student3.jpg", alt: "Student athlete with injury" },
    { src: "/images/student4.jpg", alt: "Student needing prescription" },
    { src: "/images/student5.jpg", alt: "Student with allergies" }
  ];

  const chatExamples = [
    {
      userMessage: "Hi, I've been having a persistent headache and fever (101°F) for the past 2 days. I've tried taking Tylenol but the symptoms keep coming back. Should I be concerned?",
      aiResponse: "Given your symptoms and their persistence, it would be best to get checked by a healthcare provider. Here are the earliest available appointments nearby:",
      options: [
        { name: "University Health Center", distance: "0.3", cost: "$20-35", extra: "Next available: Today at 2:45 PM", time: "2:45 PM" },
        { name: "Student Urgent Care", distance: "1.2", cost: "$35-50", extra: "Walk-in: Current wait 15 mins", time: "Now" },
        { name: "Campus Medical Clinic", distance: "0.8", cost: "$25-40", extra: "Next available: Today at 3:30 PM", time: "3:30 PM" }
      ]
    },
    {
      userMessage: "I've been feeling really anxious about my upcoming exams and having trouble sleeping. What resources are available?",
      aiResponse: "I understand exam stress can be challenging. Here are the earliest counseling appointments available:",
      options: [
        { name: "Student Counseling Center", distance: "0.1", cost: "Free", extra: "Next available: Today at 4:15 PM", time: "4:15 PM" },
        { name: "Wellness Center - Stress Management", distance: "0.5", cost: "Free", extra: "Group session starts at 5:00 PM", time: "5:00 PM" },
        { name: "Mental Health Support Line", distance: "Remote", cost: "Free", extra: "Available 24/7 - No wait time", time: "Now" }
      ]
    },
    {
      userMessage: "I think I sprained my ankle during intramural sports. It's swollen and hurts to walk. Where can I get it checked?",
      aiResponse: "A sprained ankle should be evaluated promptly. Here are the soonest available appointments for sports injuries:",
      options: [
        { name: "Sports Medicine Clinic", distance: "0.4", cost: "$25-40", extra: "Next available: Today at 1:30 PM", time: "1:30 PM" },
        { name: "Physical Therapy Center", distance: "0.8", cost: "$30-45", extra: "Walk-in: Current wait 20 mins", time: "Now" },
        { name: "University Athletic Trainer", distance: "0.2", cost: "$20-35", extra: "Next available: Today at 2:00 PM", time: "2:00 PM" }
      ]
    },
    {
      userMessage: "I need to refill my prescription medication but the pharmacy is closed. What should I do?",
      aiResponse: "Don't worry, here are the nearest pharmacies that can help you right now:",
      options: [
        { name: "Campus Corner Pharmacy", distance: "0.2", cost: "$10-30", extra: "Open now - No wait time", time: "Now" },
        { name: "University Medical Center Pharmacy", distance: "0.6", cost: "$10-30", extra: "Open 24/7 - 5 min wait", time: "5 mins" },
        { name: "Student Health Pharmacy", distance: "0.4", cost: "$10-30", extra: "Opens at 3:00 PM", time: "3:00 PM" }
      ]
    },
    {
      userMessage: "I have seasonal allergies and they're getting worse. Where can I get tested and treated?",
      aiResponse: "Allergy testing and treatment are available at these locations. Here are the earliest appointments:",
      options: [
        { name: "Student Health Allergy Clinic", distance: "0.3", cost: "$30-45", extra: "Next available: Today at 3:45 PM", time: "3:45 PM" },
        { name: "Allergy & Asthma Center", distance: "1.0", cost: "$40-55", extra: "Next available: Today at 2:15 PM", time: "2:15 PM" },
        { name: "University Medical Group", distance: "0.7", cost: "$35-50", extra: "Walk-in: Current wait 30 mins", time: "Now" }
      ]
    }
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    // Basic email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    // Regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email to local storage
      localStorage.setItem('unihealth-email', email);

      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to check email');
      }

      const data = await response.json();
      setIsSubmitting(false);

      if (data.exists) {
        // If email exists, redirect to POC page
        router.push('/poc');
      } else {
        // If email doesn't exist, redirect to form page with email as query param
        router.push(`/form?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setEmailError('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };



  // Save and load theme preference from local storage
  useEffect(() => {
    // Save current theme preference whenever it changes
    localStorage.setItem('unihealth-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % chatExamples.length);
    }, 40000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${darkMode ? 'dark bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto px-3 sm:px-4">
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
                width={32}
                height={32}
                className="object-contain w-full h-full"
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

      {/* Split Screen */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Half */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 flex items-center justify-center p-3 sm:p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-4"
          >
            <div className="text-center">
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white leading-tight tracking-tight px-4 sm:px-0"
              >
                Your health, in your hands
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0"
              >
                Health-first AI made just for university students
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 mt-6 sm:mt-8 px-4 sm:px-0"
                onSubmit={handleEmailSubmit}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear error when user types
                    if (emailError) setEmailError('');
                  }}
                  placeholder="Enter your personal email"
                  className={`w-full px-4 py-3 rounded-xl border-2 ${emailError ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154734] dark:focus:ring-[#2a724f] focus:border-transparent transition-all duration-200`}
                />
                {emailError && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-1">{emailError}</p>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || !email.trim()}
                  className="w-full py-3 bg-[#154734] dark:bg-[#2a724f] text-white rounded-xl hover:bg-[#1d5f45] dark:hover:bg-[#358f63] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isSubmitting ? 'Checking...' : 'Continue'}
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Right Half - Chat Example */}
        <div className="w-full md:w-1/2 bg-gradient-to-bl from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 transition-colors duration-200 flex items-center justify-center p-3 sm:p-4 mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mx-2 sm:mx-4 md:mx-0"
          >
            <div className="p-2 sm:p-2.5 space-y-1.5 relative">
              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 sm:-left-2 -right-1 sm:-right-2 flex justify-between pointer-events-none z-10">
                <button
                  onClick={() => setCurrentExampleIndex((prev) => (prev === 0 ? chatExamples.length - 1 : prev - 1))}
                  className="p-1.5 pointer-events-auto hover:scale-110 transition-transform duration-200"
                  aria-label="Previous example"
                >
                  <svg className="w-6 h-6 text-gray-800/90 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentExampleIndex((prev) => (prev === chatExamples.length - 1 ? 0 : prev + 1))}
                  className="p-1.5 pointer-events-auto hover:scale-110 transition-transform duration-200"
                  aria-label="Next example"
                >
                  <svg className="w-6 h-6 text-gray-800/90 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {/* Navigation Dots */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {chatExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExampleIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${index === currentExampleIndex ? 'bg-green-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                    aria-label={`View example ${index + 1}`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentExampleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2 mx-0 sm:mx-2"
                >
                  {/* User Message */}
                  <div className="flex gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-2 ring-[#154734]/20 dark:ring-[#2a724f]/20 shadow-lg">
                      <Image
                        src={studentProfiles[currentExampleIndex].src}
                        alt={studentProfiles[currentExampleIndex].alt}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full hover:opacity-90 transition-opacity duration-200"
                        priority
                      />
                    </motion.div>
                    <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-2 sm:p-2.5 relative before:absolute before:w-2 before:h-2 before:bg-blue-50 dark:before:bg-blue-900/30 before:-left-1 before:top-4 before:rotate-45">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Today, 2:35 PM</p>
                      <p className="text-gray-800 dark:text-gray-200 text-sm">{chatExamples[currentExampleIndex].userMessage}</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3 flex-row-reverse">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg ring-2 ring-gray-100 dark:ring-gray-700">
                      <Image
                        src="/images/logo.png"
                        alt="UniHealth AI"
                        width={24}
                        height={24}
                        className="object-contain sm:w-7 sm:h-7"
                        priority
                      />
                    </motion.div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-2 sm:p-2.5 relative before:absolute before:w-2 before:h-2 before:bg-gray-50 dark:before:bg-gray-800/50 before:-right-1 before:top-4 before:rotate-45">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">Today, 2:35 PM</p>
                      <p className="text-gray-800 dark:text-gray-200 mb-2">{chatExamples[currentExampleIndex].aiResponse}</p>
                      <div className="space-y-2">
                        {chatExamples[currentExampleIndex].options.map((option, index) => (
                          <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.02 }}
                            className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-2.5 shadow-sm relative overflow-hidden group hover:ring-2 hover:ring-gray-200 dark:hover:ring-gray-700 transition-all duration-200"
                          >
                            {typeof option.time === 'string' && option.time === 'Now' && (
                              <div className="absolute right-0 top-0 px-0.5 sm:px-1 py-0.5 rounded-bl-lg bg-green-50 dark:bg-green-900/30">
                                <p className="text-[9px] sm:text-[10px] font-medium">
                                  <span className="text-green-600 dark:text-green-400 flex items-center gap-0.5">
                                    <span className="relative flex h-0.5 w-0.5 sm:h-1 sm:w-1">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-0.5 w-0.5 sm:h-1 sm:w-1 bg-green-500"></span>
                                    </span>
                                    Available Now
                                  </span>
                                </p>
                              </div>
                            )}
                            <div className="pr-4 sm:pr-6">
                              <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm">{option.name}</p>
                              <div className="flex flex-row items-center gap-3 mt-1.5">
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400"></span>
                                    <span className="text-gray-600 dark:text-gray-400">{option.distance} miles</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                                    <span className="font-medium text-gray-900 dark:text-white">{option.cost}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${typeof option.time === 'string' && option.time === 'Now' ? 'bg-green-500 dark:bg-green-400' : 'bg-blue-500 dark:bg-blue-400'}`}></div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">{option.extra}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {chatExamples.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentExampleIndex ? 'w-6 bg-gray-800 dark:bg-gray-200' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
