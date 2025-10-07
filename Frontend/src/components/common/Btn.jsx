import React from 'react'

function Btn({type = 'button', onClick, text, disabled = false,  className = 'bg-amber-600'}) {
  return (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base text-shadow-m font-semibold rounded-xl sm:rounded-2xl hover:from-gray-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg sm:shadow-xl ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {text}
    </button>
  )
}

export default Btn
