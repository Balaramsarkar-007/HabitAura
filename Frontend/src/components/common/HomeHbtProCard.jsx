import React from 'react';


function HomeHbtProCard({heading, icon, description, iconColor = 'bg-teal-100'}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${iconColor}`}>
        {/* <Check className="w-8 h-8 text-teal-600" strokeWidth={2.5} />
         */}
         {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {heading}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default HomeHbtProCard
