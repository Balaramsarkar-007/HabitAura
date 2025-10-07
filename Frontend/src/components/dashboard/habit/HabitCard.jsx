import React, {useState, useEffect} from 'react'
import { PencilLine, Trash2, Flame, Target, Clock } from 'lucide-react';
import CustomBtn from '../../buttons/CustomBtn';
import {format, isToday} from 'date-fns';

function HabitCard({habit, handelOnMakeDone, handelonDelete, onEdit}) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const today = format(new Date(), 'dd-MM-yyyy');
    setIsDone(habit?.complatedDates?.includes(today));
  },[])
  const categoryStyle = [
    {name : 'fitness', class : 'bg-orange-100 text-orange-700'},
    {name : 'wellness', class : 'bg-green-100 text-green-700'},
    {name : 'productivity', class : 'bg-blue-100 text-blue-700'},
    {name : 'health', class : 'bg-purple-100 text-purple-700'},
    {name : 'learning', class : 'bg-pink-100 text-pink-700'},
    {name : 'mindfulness', class : 'bg-indigo-100 text-indigo-700'},
    {name : 'lifestyle', class : 'bg-gray-100 text-gray-700'},
    {name : 'creativity', class : 'bg-purple-100 text-purple-700'},
    {name : 'others', class : 'bg-blue-100 text-blue-700'},
  ]

  const handleButtonClick = () => {
    setIsDone(!isDone);
    handelOnMakeDone(habit);
  };

  return (
   <div className='bg-white rounded-3xl shadow-sm p-4 sm:p-6 mt-2'>
          <div className='flex justify-between items-start'>
            <div className='flex items-center flex-1 min-w-0'>
              <div className={`flex items-center justify-center ${habit.bgColor} rounded-2xl p-2 mr-2 flex-shrink-0`}>
                <span className='text-xl sm:text-2xl'>{habit.logo}</span>
              </div>
              <div className='min-w-0 flex-1'>
                <h1 className='text-base sm:text-lg font-bold truncate'>{habit.name}</h1>  
                <p className={`${categoryStyle.find(cat => cat.name === habit.category)?.class} text-center font-semibold text-xs sm:text-sm p-1 sm:p-1.5 rounded-2xl w-min mt-1`}>{habit.category}</p>
              </div>  
            </div>
            <div className='flex flex-shrink-0 ml-2'>
              <PencilLine onClick={() => onEdit(habit)} className='text-gray-500 mr-2 cursor-pointer' size={18} />
              <Trash2
                onClick={() => handelonDelete(habit)}
               className='text-gray-500 cursor-pointer' size={18}/>
            </div>
          </div>

          <p className='my-4 text-sm sm:text-md text-gray-700'>{habit.des}</p>

          <div className='flex items-center justify-around gap-4'>
            <div className='text-center flex-1'>
              <div className='flex items-center justify-center'>
                <Flame color='red' size={18} />
                <p className='ml-1 sm:ml-2 text-gray-800 text-sm sm:text-md'>Current</p>
              </div>
              <h1 className='text-2xl sm:text-3xl text-center mt-2 font-bold'>{habit.current}</h1>
            </div>

            <div className='text-center flex-1'>
              <div className='flex items-center justify-center'>
                <Target color='green' size={18} />
                <p className='ml-1 sm:ml-2 text-gray-800 text-sm sm:text-md'>Target</p>
              </div>
              <h1 className='text-2xl sm:text-3xl text-center mt-2 font-bold'>{habit.target}</h1>
            </div>
          </div>

          
          <div className='flex items-center gap-2 mt-6 sm:mt-8'>
            <Clock size={18} />
            <p className='text-gray-500 text-sm sm:text-base truncate'>Reminder: {habit.reminder.active ? habit.reminder.time : 'No Reminder Set'}</p>
          </div>

          <div className='flex items-center justify-between mt-4 w-full'>
            <CustomBtn 
              text={isDone ? '✓ Completed Today' : 'Mark as Done'} 
              type='button' 
              isDisable={isDone && true} 
              customClass={`w-full text-sm sm:text-base ${isDone ? 'bg-green-600 text-green-800 cursor-not-allowed' : 'bg-gray-800'}`} 
              onClick={handleButtonClick} 
            />
          </div>
        </div>
  )
}

export default HabitCard
