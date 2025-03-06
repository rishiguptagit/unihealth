"use client";

import { FiSun, FiMoon, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Thank you for your message. I understand you need assistance. Let me help connect you with the right healthcare resources.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${darkMode ? 'dark bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-3 sm:py-4 w-full sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
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
              <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                UniHealth
              </h1>
            </Link>
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

      {/* Chat Container */}
      <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-2 sm:p-4 gap-2 sm:gap-4">
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3 sm:p-4 ${message.type === 'user' 
                    ? 'bg-[#154734] text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' 
                    ? 'text-gray-300' 
                    : 'text-gray-500 dark:text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-grow px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154734] dark:focus:ring-[#2a724f] focus:border-transparent transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#154734] hover:bg-[#1d5f45] text-white font-medium transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
