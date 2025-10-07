import React,{useState} from 'react'
import { Plus, Target, CalendarCheck2, CopyPlus  } from 'lucide-react';
import CustomBtn from '../components/buttons/CustomBtn'
import HabitCard from '../components/dashboard/habit/HabitCard';
import AddHabit from '../components/dashboard/habit/AddHabit';
import { useHabit } from '../context/HabitContext';
import goal2 from "../assist/goal2.svg";
import {motion} from 'motion/react'


function HabitsPage() {
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [editHabitData, setEditHabitData] = useState(null);
  const { habits, markAsDone, deleteHabit, loading } = useHabit();


  const handelOnMakeDone = (data) => {
    markAsDone(data._id);
  }

  const handelHabitdelete = (data) => {
    deleteHabit(data._id);
  }


  const handelHabitEdit = (data) => {
    // console.log("Edit habit:", data); 
    setShowAddHabit(true);
    setEditHabitData(data);
  }


  return (
    <div>
      <div className='flex items-center justify-between md:mt-4'>
        <div>
          <h1 className='text-2xl md:text-4xl font-bold text-gray-800'>My Habits</h1>
          <p className='text-xs md:text-lg md:mt-2 text-gray-500'>
            Track and manage your daily habits
          </p>
        </div>
        <CustomBtn text='Add Habits' 
        icon={<Plus className='inline mr-2' size={22} strokeWidth={3} />}
        onClick={() => (setShowAddHabit(true), setEditHabitData(null))}
         />
      </div>

      {habits.length === 0 && (
        <div className='flex flex-col items-center justify-center max-w-md mx-auto h-[30vh] my-30'>
          <img src={goal2} alt="Goal" className="mx-auto mb-2 w-60 h-60 md:w-80 md:h-80" />
          <h1 className='text-lg md:text-2xl font-bold text-gray-800'>No Habits Found</h1>
          <p className='text-base md:mt-2 text-gray-500'>
            Start by adding your first habit
          </p>
        </div>
      )}

      {/* display the active habits */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6 gap-8'>
        {/* habit card */}
        {
          habits.map((habit, index) => (
            <motion.div 
            key={index}
             initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
            <HabitCard 
              key={index} 
              habit={habit} 
              handelOnMakeDone={handelOnMakeDone} 
              handelonDelete = {handelHabitdelete}  
              onEdit = {handelHabitEdit}
              />
            </motion.div>
          ))
        }
      </div>

      {/* display the modal overly */}
        {showAddHabit && (
          <div className="fixed inset-0 bg-gray-800/50 backdrop-blur flex items-center justify-center z-50">
            <AddHabit 
            onClose={() => setShowAddHabit(false)}
            editData = {editHabitData}
            />
          </div>
        )}

        {/* display status section */}
        <div className=' md:mt-12 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded-3xl shadow-sm p-3 md:p-6'>
          <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-6'>Habits Overview</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6'>
            {/* Total Active Habits */}
          <div className='bg-blue-50 rounded-lg p-2 md:p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-blue-900'>Active Habits</h3>
              <Target className='text-blue-500' size={30} />
            </div>
            <p className='text-3xl font-bold text-blue-700 mt-2'>{habits.length}</p>
          </div>

          {/* Completion Rate */}
          <div className='bg-green-50 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-green-900'>Completion Rate</h3>
              <CalendarCheck2 color='green' size={24} />
            </div>
            <p className='text-3xl font-bold text-green-700 mt-2'>
              {Math.round((habits.reduce((acc, habit) => acc + (habit.current / habit.target), 0) / habits.length) * 100) || 0}%
            </p>
          </div>

          {/* Categories */}
          <div className='bg-purple-50 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-purple-900'>Categories</h3>
              <CopyPlus color='purple' size={24} />
            </div>
            <p className='text-3xl font-bold text-purple-700 mt-2'>
              {new Set(habits.map(habit => habit.category)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HabitsPage
