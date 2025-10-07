import React from 'react'

function CustomBtn({ text = 'add', bgColor = 'bg-blue-700', type = "button", icon, customClass, onClick, isDisable = false }) {
return (
    <button
     type={type}
     disabled={isDisable}
     onClick={onClick}
     className={`px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 ${bgColor} text-white rounded-lg sm:rounded-xl md:rounded-2xl cursor-pointer shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium sm:font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-0 sm:gap-2 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] ${customClass}`}>
            {icon && <span className='text-white'>{icon}</span>}
         <span className="truncate">{text}</span>
    </button>
)
}

export default CustomBtn
