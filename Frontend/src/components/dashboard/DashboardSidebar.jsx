import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Target,
  TrendingUp,
  Bell,
  Share2,
  Brain,
} from "lucide-react";

function DashboardSidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname || "/dashboard/overview");

  const sidebarItems = [
    {
      name: "Overview",
      link: "/dashboard/overview",
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      shortName: "Home"
    },
    { 
      name: "Habits", 
      link: "/dashboard/habits", 
      icon: <Target className="w-5 h-5 text-green-600" />,
      shortName: "Habits"
    },
    {
      name: "Progress",
      link: "/dashboard/progress",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      shortName: "Progress"
    },
    { 
      name: "Reminder", 
      link: "/dashboard/reminder", 
      icon: <Bell className="w-6 h-6 text-orange-600" />,
      shortName: "Alerts"
    },
    {
      name: "Share Habit",
      link: "/dashboard/share-habit",
      icon: <Share2 className="w-6 h-6 text-pink-600" />,
      shortName: "Share"
    },
    {
      name: "AI Recommendation",
      link: "/dashboard/ai-recommendations",
      icon: <Brain className="w-6 h-6 text-indigo-600" />,
      shortName: "AI"
    },
  ];

  const handleItemClick = (link) => {
    setActiveItem(link);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block backdrop-blur-sm text-gray-800 text-lg font-semibold h-min px-2 rounded-2xl shadow-xl py-6 mt-4">
        <nav className="space-y-4">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => handleItemClick(item.link)}
              className={`block p-2 mt-6 rounded-md transition-all ${
                activeItem === item.link 
                  ? "bg-gradient-to-r from-blue-300 to-purple-300 border-l-4 border-blue-600 shadow-lg" 
                  : "hover:bg-purple-100 hover:scale-105 hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-gray-100 rounded-md mr-2">
                  {item.icon}
                </span>
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <nav className="flex justify-around items-center py-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={() => handleItemClick(item.link)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                activeItem === item.link 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <span className="mb-1">
                {React.cloneElement(item.icon, { 
                  className: `w-5 h-5 ${activeItem === item.link ? 'text-blue-600' : 'text-gray-600'}` 
                })}
              </span>
              <span className="text-xs font-medium">{item.shortName}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default DashboardSidebar;