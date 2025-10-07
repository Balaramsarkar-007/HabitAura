import React from 'react'
import { Target, Flame, TrendingUp, Trophy,  } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import OverViewHabitCard from "../components/dashboard/overview/OverViewHabitCard";
import { useHabit } from '../context/HabitContext';
import {motion} from 'motion/react'
import { getHours } from 'date-fns';

function OverviewPage() {
  const { habitStats, weaklyProgress, categoryStats, user } = useHabit();

    const stats = [
    {
      title: 'Active Habits',
      value: habitStats.totalActiveHabits,
      icon: Target,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: 'Current Streak',
      value: habitStats.currentStreak,
      icon: Flame,
      color: 'bg-orange-500',
      change: '+5 days'
    },
    {
      title: 'Completion Rate',
      value:  habitStats.totalProgress + '%',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+12% this week'
    },
    {
      title: 'Achievements',
      value: habitStats.achievements,
      icon: Trophy,
      color: 'bg-purple-500',
      change: '2 new this month'
    }
  ];
  

  const dailyHabitData = [
    {habit : "Morning Meditation", streak : "15 days streak", logo : '🧘'},
    {habit : "Evening Workout", streak : "10 days streak", logo : '🏋️‍♂️'},
    {habit : "Reading", streak : "5 days streak", logo : '📚'},
    {habit : "Journaling", streak : "2 days streak", logo : '📓'},
  ];

  const hours = getHours(new Date());
  let greeting = '';

  if (hours < 12) {
    greeting = 'Good morning';
  } else if (hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return (
    <div className="">
      <div className="md:mt-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          {greeting}, {user.username} 👋
        </h1>
        <p className="text-gray-600 text-md mt-2 text-sm md:text-base">You're doing great! Here's your habit overview for today</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:mt-4 gap-2 md:gap-6">
        {/* habit overview display */}
       {
          stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <OverViewHabitCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="w-8 h-8 text-white" />}
              color={stat.color}
              change={stat.change}
            />
            </motion.div>
          ))
       }
      </div>

       {/* progress section */}
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6'>
      {/* chats progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
           className='p-1 md:p-8 lg:col-span-2 bg-white rounded-3xl shadow-sm'>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg md:text-2xl font-bold'>Weekly Progress</h1>
              <div className='flex items-center'>
                <div className='w-3 h-3 rounded-full bg-green-600'></div>
                <p className=' text-xs md:text-base text-gray-500 ml-2'>Completed</p>
              </div>
            </div>
            <div className='mt-6'>
             <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 300 : 400} >
                <LineChart data={weaklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-gray-600 text-xs md:text-base" />
                  <YAxis axisLine={false} tickLine={false} className="text-gray-600 text-xs md:text-base" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* habits categories */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className='bg-white rounded-3xl shadow-sm p-4 md:p-8 '>
              <h1 className='text-xl md:text-2xl font-bold'>Habits Categories</h1>
              <div>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie 
                      data={categoryStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="catPer"
                    >
                      {
                        categoryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                      }
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
             
             {
              categoryStats.map((data, index) => (
                <div
                 key={index}
                className='flex items-center justify-between mt-2'>
                <div className='flex items-center gap-1'>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                    <p className='text-gray-500 ml-2 font-semibold'>{data.name.toUpperCase()}</p>
                </div>
                <p className='text-gray-500 font-semibold'>{data.catPer}%</p>
              </div>
              ))
             }
          </motion.div>
      </div>

      {/* todays habit section */}
      <div className='bg-white rounded-3xl shadow-sm p-4 md:p-8 mt-8'>
        <h1 className='text-lg md:text-2xl font-bold'>Today's Habits</h1>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {
            dailyHabitData.map((data, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className='border-2 border-gray-300 bg-gray-50 p-2 rounded-2xl'>
             <div className='flex items-center'>
              <div className='text-3xl rounded-full'>
                {data.logo}
              </div>
              <div className='pl-4'>
                <h2 className='text-sm md:text-base font-semibold'>{data.habit}</h2>
                <p className='text-gray-500'>{data.streak}</p>
              </div>
             </div>
          </motion.div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
