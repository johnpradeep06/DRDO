import { CustomerSupport } from '@/components/dashboard/Scientist/CustomerSupport';
import { FinancialDash } from '@/components/dashboard/Scientist/FinancialDash';
import { MarketingDash } from '@/components/dashboard/Scientist/MarketingDash';
import { ScientistProfile } from '@/components/dashboard/Scientist/quickacess';

import { Button } from '@/components/ui/button';
import {Dashcontent} from "@/components/dashboard/Admin/dashboard";
import React, { useEffect, useState } from 'react';



type Tab = 'Finance' | 'Market' | 'Dashcontent' | 'Project' | 'Customer'|'Report';

export const A_Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Dashcontent');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const [curDash, setCurDash] = useState<React.ReactNode>(<Dashcontent />);

  useEffect(() => {
    switch (activeTab) {
      case 'Finance':
        setCurDash(<FinancialDash />);
        break;
      case 'Market':
        setCurDash(<MarketingDash />);
        break;
      case 'Customer':
        setCurDash(<CustomerSupport />);
        break;
      case 'Dashcontent':
        setCurDash(<Dashcontent/>);
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
            onClick={() => handleTabChange('Dashcontent')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
                activeTab === 'Dashcontent'
                  ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
              }`}
            >
            Dashboard
        </Button>

        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Market')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Market'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            Pending application
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Finance')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Finance'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            User Management 
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
            Board management 
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Customer')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Customer'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            Score 
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Report')}
            className={`w-full px-8 py-5 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Customer'
              ? 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100' 
            }`}
          >
            Reports /  Analytics  
          </Button>
        </li>
        
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full transition-colors duration-300">
        {curDash}
      </div>
    </div>
  );
};
