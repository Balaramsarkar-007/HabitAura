import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashbaordHeader';

function DashboardLayout({children}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">
        {/* Sidebar */}
        <div className="md:w-min lg:flex-shrink-0 lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:p-2">
          <DashboardSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 pb-20 lg:pb-0 lg:ml-64">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
