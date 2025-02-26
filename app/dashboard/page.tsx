"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiUser, FiHome, FiCalendar } from 'react-icons/fi';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
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
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Student Health Portal</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${activeTab === 'home' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
            >
              <FiHome className="w-4 h-4" /> <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${activeTab === 'profile' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
            >
              <FiUser className="w-4 h-4" /> <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('appointment')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${activeTab === 'appointment' ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
            >
              <FiCalendar className="w-4 h-4" /> <span>Schedule Appointment</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {activeTab === 'home' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Welcome to Student Health Services</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your health and wellbeing are our top priority. Access medical services, schedule appointments,
              and manage your health information all in one place.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl transition-colors duration-200">
                <h3 className="font-bold mb-2 dark:text-white">Quick Links</h3>
                <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
                  <li>Emergency Contacts</li>
                  <li>Health Resources</li>
                  <li>COVID-19 Information</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-xl transition-colors duration-200">
                <h3 className="font-bold mb-2 dark:text-white">Announcements</h3>
                <p className="text-sm dark:text-gray-300">Flu shots now available! Schedule your appointment today.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">My Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Student ID</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Enter your student ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'appointment' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-200">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Schedule an Appointment</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Appointment Type</label>
                <select
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option>General Checkup</option>
                  <option>Vaccination</option>
                  <option>Mental Health</option>
                  <option>Physical Therapy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preferred Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Preferred Time</label>
                <select
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Additional Notes</label>
                <textarea
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  rows={3}
                  placeholder="Any specific concerns or information you'd like to share?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Schedule Appointment
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
