import React, {useState, useEffect} from 'react'
import { X, Clock, Tag, BellDot } from 'lucide-react';
import CustomBtn from '../../buttons/CustomBtn';
import TextInput from "../../common/TextInput";
import { set, useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ToggleBtn from '../../buttons/ToggleBtn';
import { useHabit } from '../../../context/HabitContext';
import { toast } from 'react-toastify';

const schema = yup.object({
  name : yup.string().required('Habit name is required'),
  category: yup.string().required('Category is required'),
  description : yup.string(),
  frequency: yup.string(),
  target : yup.number().positive().required('Target day is required'),
  reminderTime : yup.string(),
});

function AddHabit({onClose, editData}) {
  const { register, handleSubmit, watch, setValue, reset, formState: { errors  } } = useForm({
    resolver: yupResolver(schema), 
    defaultValues: {
      name: '',
      category: 'fitness',
      description: '',
      frequency: 'daily',
      target: 1,
      icon: '🎯',
      color: 'bg-green-100',
      // id : null,
    }
  });
  const [selectedIcon, setSelectedIcon] = useState({ emoji: '🎯', name: 'goal' });
  const [selectedColor, setSelectedColor] = useState('bg-green-100');
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const { habits, addHabit, editHabit } = useHabit();

  useEffect(() => {
    if(editData) {
       // Set form values
      setValue('name', editData.name);
      setValue('category', editData.category);
      setValue('description', editData.des);
      setValue('frequency', editData.reminder?.freq || 'daily');
      setValue('target', editData.target);
      setValue('reminderTime', editData.reminder?.time || '09:00');
      setValue('current', editData.current || 0);
      setValue('_id', editData._id);

      // set icon and color
      setSelectedIcon({emoji: editData.logo, name:  editData.name});
      setSelectedColor(editData.bgColor);

      // set reminder state
      setIsReminderEnabled(editData.reminder?.active || false);
    } else {
      reset();
      setSelectedIcon({ emoji: '🎯', name: 'goal' });
      setSelectedColor('bg-green-100');
      setIsReminderEnabled(false);
    }
  }, [editData, setValue, reset]);

  const availableIcons = [
    { emoji: '🎯', name: 'goal' },
    { emoji: '🧘', name: 'meditation' },
    { emoji: '🏋️', name: 'weightlifting' },
    { emoji: '📚', name: 'reading' },
    { emoji: '🎨', name: 'art' },
    { emoji: '💻', name: 'coding' },
    { emoji: '💧', name: 'water' },
    { emoji: '💪', name: 'fitness' },
    { emoji: '🏃', name: 'running' },
    { emoji: '⏳', name: 'time management' },
    { emoji: '🎵', name: 'music' },
    { emoji: '🔥', name: 'fire' },
    { emoji: '🌱', name: 'plant' },
    { emoji: '📈', name: 'growth' },
    { emoji: '🏆', name: 'achievement' },
    { emoji: '🍎', name: 'fruit' },
    { emoji: '🏠', name: 'home' },
    { emoji: '💡', name: 'idea' },
    { emoji: '🚶‍♂️‍➡️', name: 'walking' },
    { emoji: '🎄', name: 'nature' },
  ];

  const availableColors = [
    {bg : "bg-green-500", iconBg : "bg-green-100"},
    {bg : "bg-blue-500", iconBg : "bg-blue-100"},
    {bg : "bg-red-500", iconBg : "bg-red-100"},
    {bg : "bg-yellow-500", iconBg : "bg-yellow-100"},
    {bg : "bg-purple-500", iconBg : "bg-purple-100"},
    {bg : "bg-pink-500", iconBg : "bg-pink-100"},
    {bg : "bg-indigo-500", iconBg : "bg-indigo-100"},
    {bg : "bg-gray-500", iconBg : "bg-gray-100"},
    {bg : "bg-lime-500", iconBg : "bg-lime-100"},
    {bg : "bg-fuchsia-500", iconBg : "bg-fuchsia-100"},
  ];

  const onSubmit = async (data) => {
    onClose();

    const newHabit = {
      // id : data.id,
      name : data.name,
      des : data.description,
      category : data.category,
      target : data.target,
      current : data.current || 0,
      reminder : {
        active : isReminderEnabled || false,
        time : data.reminderTime || '09:00',
        freq : data.frequency,
      },
      logo : selectedIcon.emoji,
      bgColor : selectedColor,
      isCompleted : false,
      complatedDates : editData ? editData.complatedDates : [],
      ...data,
    }

    if(editData) {
      editHabit(newHabit);
      console.log('edit', newHabit);
    } else {
      addHabit(newHabit);
    }
    reset();
  };

  return (
    <div className='bg-white rounded-3xl shadow-2xl p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
      {/* header */}
      <div className='flex items-center justify-between px-4 py-2'>
        <h2 className='text-2xl font-bold'>{editData ? 'Edit Habit' : 'Add New Habit'}</h2>
        <div
          className='text-lg p-2 rounded-xl cursor-pointer hover:bg-gray-200'
          onClick={onClose}
          >
          <X color='black' size={26} strokeWidth={2.5}/>
        </div>
      </div>

      {/* form sections */}
      <form className='px-4 ' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6 md:grid-cols-2 mt-6'>
          <TextInput
            label='Habit Name'
            required={true}
            register={register('name')}
            placeholder='Ex. Morning Workout'
            error={errors.name?.message}
          />

          <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
              Category
              <Tag className="inline-block ml-2" size={16} />
            </label>
            <select
              {...register('category')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="fitness" selected>Fitness</option>
              <option value="health">Health</option>
              <option value="productivity">Productivity</option>
              <option value="learning">Learning</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="creativity">Creativity</option>
              <option value="others">Others</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className='mt-6'>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              rows={3}
              placeholder="Describe your habit..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

        <div className='grid gap-6 md:grid-cols-2 mt-6'>
           <div>
            <label className="block text-sm md:text-lg font-medium text-gray-700 mb-2">
              Frequency
              <Clock className="inline-block ml-2" size={16} />
            </label>
            <select
              {...register('frequency')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="daily" selected>Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {errors.frequency && (
              <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
            )}
          </div>

          <TextInput 
            label='Target Day'
            required={true}
            type='number'
            register={register('target')}
            placeholder='Ex. 21'
            error={errors.target?.message}
          />
        </div>

        {/* choose icons */}
        <div className='mt-6'>
          <p className='text-sm md:text-lg font-medium text-gray-700 mb-2'>
            Choose Icon
          </p>

          <div className='grid grid-cols-5 md:grid-cols-10'>
            {
              availableIcons.map((icon, index) => (
                 <div key={index} 
                 onClick={() => setSelectedIcon(icon)}
                 className={` p-2  rounded-xl w-min text-xl mb-4 cursor-pointer ${selectedIcon.emoji === icon.emoji ? 'ring-2 ring-blue-500 bg-blue-100' : 'bg-gray-100'}`}>{icon.emoji}</div>
              ))
            }
          </div>
        </div>

        {/* choose background color */}
        <div className='mt-6'>
          <p className='text-sm md:text-lg font-medium text-gray-700 mb-2'>
            Choose Color
          </p>

          <div className='grid grid-cols-5 md:grid-cols-10 gap-1'>
          {
            availableColors.map((color, index) => (
              <div key={index} 
              className={`w-10 h-10 rounded-full ${color.bg} cursor-pointer ${selectedColor === color.iconBg && 'border-pink-700 border-4'}`} 
              onClick={() => setSelectedColor(color.iconBg)}>
              </div>
            ))
          }
          </div>
        </div>

        {/* reminder settings */}
        <div className='mt-6 bg-gray-50 p-4 rounded-2xl'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3 items-center py-4'>
              <BellDot  className="inline-block text-gray-700" size={24} strokeWidth={2.5} />
              <p className='text-base md:text-xl font-medium text-gray-900'>Set a reminder</p>
            </div>
            <ToggleBtn
              isChecked={isReminderEnabled}
              onToggle={setIsReminderEnabled}
            />
          </div>

          {
            isReminderEnabled && (
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Reminder Time
                </label>
                <input
                  type='time'
                  defaultValue={'09:00'}
                  {...register('reminderTime')}
                  className='w-min p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            )}
          
        </div>
        {/* habit preview */}
        <div className='mt-6 bg-gray-50 p-2 md:p-4 rounded-lg'>
          <p className='text-sm md:text-lg font-medium text-gray-700 mb-2'>
            Habit Preview
          </p>
          
          <div className='mt-4'>
            <div className={`rounded-2xl border-2 flex border-gray-400`}>
              <p className={`w-14 h-14 m-4 rounded-2xl text-3xl flex items-center justify-center ${selectedColor}`} >{selectedIcon.emoji}</p>

              <div className='mt-4'>
                <h1 className='text-lg font-small font-semibold'>{watch('name') || "Habit Name"}</h1>
                <p className='text-sm text-gray-600'>{watch('description') || "Habit Description"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* submit button */}
         <div className='flex gap-4 mt-6 mb-4'>
          <button
            type='button'
            onClick={onClose}
            className='flex-1 px-4 md:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <CustomBtn
            text={editData ? 'Save Changes' : 'Add Habit'}
            type='submit'
            customClass='flex-1'
            bgColor='bg-blue-600'
          />
        </div>
        
      </form>
    </div>
  )
}

export default AddHabit
