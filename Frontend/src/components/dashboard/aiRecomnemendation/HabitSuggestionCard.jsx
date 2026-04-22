import React, { useState } from 'react'
import axios from 'axios'
import { useHabit } from '../../../context/HabitContext';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

const CATEGORY_ICONS = {
  fitness: '🏃‍♂️',
  productivity: '⚡',
  health: '💊',
  mindfulness: '🧘',
  learning: '📚',
  creativity: '🎨',
  other: '⭐',
}

function HabitSuggestionCard({ habit }) {
  const { addHabit, getHabitByName } = useHabit()
  
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const existingHabit = getHabitByName(habit.name)

  const handleAdd = async () => {
    if (added || loading) return
    setLoading(true)
    const newHabit = {
      // id : data.id,
      name : habit?.name,
      des : habit?.description,
      category : habit?.category,
      target : habit?.target || 30,
      current : habit?.current || 0,
      reminder : {
        active : false,
        time : '09:00',
        freq : 'daily',
      },
      logo : habit?.icon || CATEGORY_ICONS[habit.category] || '🎯',
      bgColor : "bg-green-100",
      isCompleted : false,
      complatedDates : [],
    }

    await addHabit(newHabit)
    setAdded(true)
    setLoading(false)
  }

  const icon = habit.icon || CATEGORY_ICONS[habit.category] || '⭐'

  const isAdded = added || existingHabit

  return (
    <div className={`rounded-2xl px-4 py-3 transition-all duration-200 border shadow-sm ${
      isAdded
        ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'
        : 'border-blue-100 bg-white hover:border-blue-300 hover:shadow-md'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
          isAdded ? 'bg-green-100' : 'bg-blue-50'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{habit.name}</p>
          <p className="text-gray-400 text-xs mt-0.5 leading-relaxed truncate">{habit.description}</p>
        </div>
        {isAdded ? (
          <span className="text-green-600 text-xs font-semibold bg-green-100 px-2.5 py-1 rounded-full flex-shrink-0">
            ✓ Added
          </span>
        ) : (
          <button
            onClick={handleAdd}
            disabled={loading}
            className="text-xs font-semibold bg-blue-500 text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 flex-shrink-0 whitespace-nowrap"
          >
            {loading ? '...' : '+ Add'}
          </button>
        )}
      </div>
    </div>
  )
}

export default HabitSuggestionCard
