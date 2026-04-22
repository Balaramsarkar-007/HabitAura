import React, {useEffect, useState} from 'react'
import AIChart from '../components/dashboard/aiRecomnemendation/AIChart'

function AIRecommendationsPage() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div>
      {/* header */}
      <div className="md:mt-4">
        <h1 className="text-2xl md:text-4xl font-bold">AI Habit Coach </h1>
        <p className="text-gray-600 text-sm md:text-base md:mt-2">
          Your personal AI assistant for building better habits
        </p>
      </div>

      {/* switch button */}
      <div className="mt-6 inline-flex bg-gray-100 rounded-full p-1">
        {/* <button
          onClick={() => setActiveTab('insights')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === 'insights'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Smart Insights
        </button> */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === 'chat'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          AI Chat
        </button>
      </div>

      {/* tab content */}
      <div className="mt-6">
        {activeTab === 'insights' && <div>Smart Insights content here</div>}
        {activeTab === 'chat' && <AIChart />}
      </div>
    </div>
  )
}

export default AIRecommendationsPage;
