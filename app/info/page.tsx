"use client";

import { FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../components/ThemeProvider';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Insurance providers with their common plans
type InsurancePlan = {
  provider: string;
  plans: string[];
};

const insuranceData: InsurancePlan[] = [
  {
    provider: 'Aetna',
    plans: ['Aetna Select', 'Aetna Open Access', 'Aetna Medicare Advantage', 'Aetna CVS Health', 'Aetna Whole Health']
  },
  {
    provider: 'Anthem',
    plans: ['Blue Access PPO', 'Blue Preferred HMO', 'Medicare Advantage', 'Pathway', 'Anthem Essential']
  },
  {
    provider: 'Blue Cross Blue Shield',
    plans: ['Blue Care Network HMO', 'Blue Preferred PPO', 'Blue Advantage HMO', 'Blue Select', 'Medicare Advantage']
  },
  {
    provider: 'Cigna',
    plans: ['Open Access Plus', 'Cigna Connect', 'Cigna Health Flex', 'Medicare Advantage', 'Cigna True Choice']
  },
  {
    provider: 'Humana',
    plans: ['Humana Gold Plus HMO', 'Humana Choice PPO', 'Humana Value Plan', 'Medicare Advantage', 'Humana Community']
  },
  {
    provider: 'Kaiser Permanente',
    plans: ['Kaiser Permanente HMO', 'Kaiser Permanente Bronze', 'Kaiser Permanente Silver', 'Kaiser Permanente Gold', 'Medicare Advantage']
  },
  {
    provider: 'Medicaid',
    plans: ['Traditional Medicaid', 'Managed Care Plan', 'Children\'s Health Insurance Program (CHIP)', 'Medicaid Expansion']
  },
  {
    provider: 'Medicare',
    plans: ['Medicare Part A', 'Medicare Part B', 'Medicare Part C (Advantage)', 'Medicare Part D', 'Medicare Supplement (Medigap)']
  },
  {
    provider: 'UnitedHealthcare',
    plans: ['UHC Choice', 'UHC Navigate', 'UHC Options PPO', 'Medicare Advantage', 'UHC Core']
  },
  {
    provider: 'TRICARE',
    plans: ['TRICARE Prime', 'TRICARE Select', 'TRICARE For Life', 'TRICARE Reserve Select', 'TRICARE Retired Reserve']
  },
  {
    provider: 'Centene',
    plans: ['Ambetter', 'Sunshine Health', 'Peach State Health', 'Superior HealthPlan', 'Managed Health Services']
  },
  {
    provider: 'Molina Healthcare',
    plans: ['Molina Marketplace', 'Molina Medicare', 'Molina Medicaid', 'Molina Dual Options', 'Molina Core']
  },
  {
    provider: 'CVS Health',
    plans: ['Aetna CVS Health', 'CVS Caremark', 'MinuteClinic', 'HealthHUB', 'CVS Pharmacy']
  },
  {
    provider: 'Health Net',
    plans: ['Health Net CommunityCare', 'Health Net PPO', 'Health Net HMO', 'Medicare Advantage', 'Health Net Medi-Cal']
  },
  {
    provider: 'WellCare',
    plans: ['WellCare Medicare Advantage', 'WellCare Prescription Drug Plan', 'WellCare Value', 'WellCare Essential', 'WellCare Access']
  },
  {
    provider: 'Oscar Health',
    plans: ['Oscar Classic', 'Oscar Simple', 'Oscar Secure', 'Oscar Bronze', 'Oscar Silver']
  },
  {
    provider: 'Ambetter',
    plans: ['Ambetter Essential Care', 'Ambetter Balanced Care', 'Ambetter Secure Care', 'Ambetter Value', 'Ambetter Select']
  },
  {
    provider: 'Other',
    plans: ['Custom Plan']
  }
];

// Extract just the provider names for the dropdown
const insuranceProviders = insuranceData.map(item => item.provider);

export default function InfoPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [insurance, setInsurance] = useState('');
  const [insurancePlan, setInsurancePlan] = useState('');
  const [showInsuranceDropdown, setShowInsuranceDropdown] = useState(false);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [filteredInsuranceProviders, setFilteredInsuranceProviders] = useState(insuranceProviders);
  const [availablePlans, setAvailablePlans] = useState<string[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // References for dropdowns
  const providerDropdownRef = useRef<HTMLDivElement>(null);
  const planDropdownRef = useRef<HTMLDivElement>(null);

  // Load user data from local storage
  useEffect(() => {
    // Handle theme preference
    const savedTheme = localStorage.getItem('unihealth-theme');
    if (savedTheme === 'dark' && !darkMode) {
      toggleDarkMode();
    } else if (savedTheme === 'light' && darkMode) {
      toggleDarkMode();
    }
    
    // Handle insurance provider
    const savedInsurance = localStorage.getItem('unihealth-insurance');
    if (savedInsurance) {
      setInsurance(savedInsurance);
    }
    
    // Handle insurance plan
    const savedPlan = localStorage.getItem('unihealth-insurance-plan');
    if (savedPlan) {
      setInsurancePlan(savedPlan);
    }
    
    setIsLoading(false);
  }, []);
  
  // Filter insurance providers based on input
  useEffect(() => {
    if (insurance && !showInsuranceDropdown) {
      const filtered = insuranceProviders.filter(provider =>
        provider.toLowerCase().includes(insurance.toLowerCase())
      );
      setFilteredInsuranceProviders(filtered);
    } else {
      setFilteredInsuranceProviders(insuranceProviders);
    }
  }, [insurance, showInsuranceDropdown]);
  
  // Update available plans when insurance provider changes
  useEffect(() => {
    if (insurance) {
      const providerData = insuranceData.find(data => data.provider === insurance);
      if (providerData) {
        setAvailablePlans(providerData.plans);
        setFilteredPlans(providerData.plans);
      } else {
        setAvailablePlans([]);
        setFilteredPlans([]);
      }
    } else {
      setAvailablePlans([]);
      setFilteredPlans([]);
    }
    
    // Clear plan selection if provider changes
    if (insurancePlan) {
      const providerData = insuranceData.find(data => data.provider === insurance);
      if (!providerData || !providerData.plans.includes(insurancePlan)) {
        setInsurancePlan('');
        localStorage.removeItem('unihealth-insurance-plan');
      }
    }
  }, [insurance]);
  
  // Filter plans based on input
  useEffect(() => {
    if (insurancePlan && availablePlans.length > 0 && !showPlanDropdown) {
      const filtered = availablePlans.filter(plan =>
        plan.toLowerCase().includes(insurancePlan.toLowerCase())
      );
      setFilteredPlans(filtered);
    } else {
      setFilteredPlans(availablePlans);
    }
  }, [insurancePlan, availablePlans, showPlanDropdown]);
  
  // Handle click outside to close provider dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (providerDropdownRef.current && !providerDropdownRef.current.contains(event.target as Node)) {
        setShowInsuranceDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle click outside to close plan dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (planDropdownRef.current && !planDropdownRef.current.contains(event.target as Node)) {
        setShowPlanDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#154734] dark:border-[#2a724f]"></div>
      </div>
    );
  }

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

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                <FiArrowLeft className="w-5 h-5" />
              </motion.div>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Information</h2>
          </div>
          
          <div className="space-y-6">
            {/* Insurance Provider Selection */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl relative">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Insurance Provider</p>
              <div className="relative" ref={providerDropdownRef}>
                <input
                  type="text"
                  value={insurance}
                  onChange={(e) => {
                    setInsurance(e.target.value);
                    setShowInsuranceDropdown(true);
                    localStorage.setItem('unihealth-insurance', e.target.value);
                  }}
                  onFocus={() => {
                    setShowInsuranceDropdown(true);
                    setFilteredInsuranceProviders(insuranceProviders); // Show all options when focused
                  }}
                  placeholder="Type or select your insurance provider"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154734] dark:focus:ring-[#2a724f] focus:border-transparent transition-all duration-200"
                />
                {showInsuranceDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                    {filteredInsuranceProviders.map((provider, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                        onClick={() => {
                          setInsurance(provider);
                          setShowInsuranceDropdown(false);
                          localStorage.setItem('unihealth-insurance', provider);
                        }}
                      >
                        {provider}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Insurance Plan Selection - Only shown when provider is selected */}
            {insurance && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl relative mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Insurance Plan</p>
                <div className="relative" ref={planDropdownRef}>
                  <input
                    type="text"
                    value={insurancePlan}
                    onChange={(e) => {
                      setInsurancePlan(e.target.value);
                      setShowPlanDropdown(true);
                      localStorage.setItem('unihealth-insurance-plan', e.target.value);
                    }}
                    onFocus={() => {
                    setShowPlanDropdown(true);
                    setFilteredPlans(availablePlans); // Show all options when focused
                  }}
                    placeholder="Type or select your specific plan"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154734] dark:focus:ring-[#2a724f] focus:border-transparent transition-all duration-200"
                  />
                  {showPlanDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-60 overflow-y-auto">
                      {filteredPlans.map((plan, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                          onClick={() => {
                            setInsurancePlan(plan);
                            setShowPlanDropdown(false);
                            localStorage.setItem('unihealth-insurance-plan', plan);
                          }}
                        >
                          {plan}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            

            
            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Validate insurance selection
                  if (!insurance) {
                    alert('Please select an insurance provider');
                    return;
                  }
                  
                  // Save all data and proceed to dashboard
                  localStorage.setItem('unihealth-insurance', insurance);
                  localStorage.setItem('unihealth-insurance-plan', insurancePlan);
                  window.location.href = '/chat';
                }}
                className="flex-1 py-3 bg-[#154734] dark:bg-[#2a724f] text-white rounded-xl hover:bg-[#1d5f45] dark:hover:bg-[#358f63] transition-colors duration-200"
              >
                Continue to UniHealth
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Clear local storage and redirect to home
                  localStorage.removeItem('unihealth-insurance');
                  localStorage.removeItem('unihealth-insurance-plan');
                  window.location.href = '/';
                }}
                className="py-3 px-4 bg-red-500 dark:bg-red-600 text-white rounded-xl hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200"
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
