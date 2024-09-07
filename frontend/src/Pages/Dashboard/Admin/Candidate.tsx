import { Details } from '@/components/dashboard/Candidate/details';
import { FinancialDash } from '@/components/dashboard/Scientist/FinancialDash';
import { MarketingDash } from '@/components/dashboard/Scientist/MarketingDash';
import { ScientistProfile } from '@/components/dashboard/Scientist/quickacess';
import { Relevance } from '@/components/dashboard/Scientist/Relevance';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';



type Tab = 'Finance' | 'Market' | 'Relevance' | 'Project' | 'Details';

export const C_Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Relevance');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const [curDash, setCurDash] = useState<React.ReactNode>(<Relevance />);

  useEffect(() => {
    switch (activeTab) {
      case 'Finance':
        setCurDash(<FinancialDash />);
        break;
      case 'Market':
        setCurDash(<MarketingDash />);
        break;
      case 'Details':
        setCurDash(<Details />);
        break;
      case 'Relevance':
        setCurDash(<Relevance />);
        break;
      case 'Project':
        setCurDash(<ScientistProfile />);
        break;
      default:
        setCurDash(<FinancialDash />);
    }
  }, [activeTab]);

  return (
    <div className="md:flex m-10">
      <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:mr-4 mb-4 md:mb-0">
        <li>
          <Button
            onClick={() => handleTabChange('Finance')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Finance'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
           Dashboard
          </Button>
        </li>
      <li>
        <Button
            onClick={() => handleTabChange('Relevance')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
                activeTab === 'Relevance'
                  ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
              }`}
            >
            Resume upload 
        </Button>

        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Details')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Details'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            Your details
          </Button>
        </li>
        
        <li>
          <Button
            onClick={() => handleTabChange('Project')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Project'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            Feedback
          </Button>
        </li>
        
        
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full transition-colors duration-300">
        {curDash}
      </div>
    </div>
  );
};
