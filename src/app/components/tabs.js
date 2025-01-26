'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Tabs({ 
  tabs, 
  defaultActiveTab = 0, 
  className 
}) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  return (
    <div className={cn('w-full mx-auto', className)}>
      {/* Tab Navigation */}
      <div 
        role="tablist" 
        className="flex vq-tabs overflow-x-auto overflow-x-auto pb-4 -mb-4 scrollbar-hide space-x-2 border-b border-gray-200 dark:border-gray-700 mb-4"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'whitespace-nowrap px-2 md:px-4 lg:px-4 py-1 md:py-2 lg:py-2  text-sm md:text-sm lg:text-sm font-medium rounded-t-lg transition-all duration-300',
              activeTab === index 
                ? 'tab-active-line font-black' 
                : 'text-gray-400 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div 
        role="tabpanel" 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  )
}