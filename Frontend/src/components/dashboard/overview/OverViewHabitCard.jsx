import React from 'react'

function OverViewHabitCard({ title, value, icon, color, change }) {
  return (
     <div className="bg-white shadow-sm hover:shadow-lg rounded-3xl p-4 sm:p-6 mt-4 w-full">
          <h2 className="text-sm sm:text-md text-gray-600 font-semibold">{title}</h2>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl md:text-3xl font-bold">{value}</h1>
            <div className={`flex items-center justify-center ${color} rounded-2xl p-2 md:p-4 text-xl`}>
              {icon}
            </div>
          </div>
          <h1 className="text-xs sm:text-sm text-green-600 mt-1">{change}</h1>
        </div>
  )
}

export default OverViewHabitCard
