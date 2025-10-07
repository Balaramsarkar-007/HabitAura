import React from 'react'

function HomeStepCard({number, heading, description}) {
  return (
    <div className='max-w-[25rem] mx-auto'>
        <div className='w-18 h-18 bg-teal-700 rounded-full text-white mx-auto'>
          <h1 className='font-semibold text-3xl text-center pt-4'>{number}</h1>
        </div>
        <div className='py-4 text-center'>
            <h1 className='text-2xl font-bold text-gray-800'>{heading}</h1>
            <p className='text-gray-600 text-lg mt-2'>{description}</p>
        </div>
      </div>
  )
}

export default HomeStepCard
