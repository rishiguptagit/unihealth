"use client";

import { FiSun, FiMoon, FiSend, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { chatWithAI } from '../utils/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleBack = () => {
    router.back();
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage(''); // Clear input after sending

    try {
      // Show loading state
      const loadingMessage: Message = {
        id: 'loading',
        type: 'bot',
        content: 'Thinking...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, loadingMessage]);

      // Get AI response
      const aiResponse = await chatWithAI(content);

      // Remove loading message and add AI response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== 'loading');
        const botMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: aiResponse,
          timestamp: new Date()
        };
        return [...withoutLoading, botMessage];
      });
    } catch (error) {
      // Handle error with more specific message
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => msg.id !== 'loading');
        const errorMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: error instanceof Error 
            ? `Error: ${error.message}`
            : 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        };
        return [...withoutLoading, errorMessage];
      });
      console.error('Error in handleSendMessage:', error);
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
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>
            <div className="flex items-center gap-2">
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
            </div>
          </div>
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

      {/* Chat Container */}
      <div className="flex-grow flex flex-col max-w-4xl mx-auto w-full p-2 sm:p-4 gap-2 sm:gap-4">
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-[#111111]/50 backdrop-blur-sm">
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
                  className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3 sm:p-4 ${
                    message.type === 'user' 
                      ? 'bg-black dark:bg-white text-white dark:text-black' 
                      : 'bg-gray-100 dark:bg-[#111111] text-gray-900 dark:text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' 
                      ? 'text-gray-300 dark:text-gray-700' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-800 bg-white dark:bg-black text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputMessage)}
            className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 font-medium"
          >
            <FiSend className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
