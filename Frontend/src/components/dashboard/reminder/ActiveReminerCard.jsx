import React, {useState} from "react";
import {PenLine, Trash2 } from "lucide-react";
import EditReminder from "./EditReminder";

function ActiveReminerCard({habit, onDisable}) {
  const [showEdit, setShowEdit] = useState(false);
  
  const calculateTimeRemaining = (reminderTime) => {
    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    
    const reminderDate = new Date();
    reminderDate.setHours(hours, minutes, 0, 0);
    
    // If reminder time has passed today, set it for tomorrow
    if (reminderDate <= now) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }
    
    const timeDiff = reminderDate - now;
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hoursLeft > 0) {
      return `${hoursLeft}h ${minutesLeft}m`;
    } else {
      return `${minutesLeft}m`;
    }
  };
  return (
    <div
      className="mb-4 p-3 md:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
    >
      <div className="flex items-center space-x-1 md:space-x-6">
        <div className={`${habit.bgColor} p-1 md:p-2 rounded-xl text-2xl md:text-3xl`}>
          {habit.logo}
        </div>
        <div>
          <h2 className="text-sm md:text-lg font-semibold">{habit.name}</h2>
          <div className="flex items-center space-x-4">
            <p className="text-xs md:text-base text-gray-500">
              {habit.reminder.time}
            </p>
            <p className="text-xs md:text-base font-bold text-blue-500">
              in {calculateTimeRemaining(habit.reminder.time)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center md:space-x-2">
        <div className="hover:bg-white md:p-2 rounded-xl">
          <PenLine className="text-gray-500 cursor-pointer" size={18} onClick={() => setShowEdit(true)} />
        </div>
        <div className="hover:bg-white p-2 rounded-xl">
          <Trash2 className="text-gray-500 cursor-pointer" size={18} onClick={() => onDisable(habit._id)} />
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-gray-600/30 backdrop-blur flex items-center justify-center z-50">
            <EditReminder 
            habit = {habit}
            onClose={() => setShowEdit(false)}
            />
          </div>
      )}
    </div>
  );
}

export default ActiveReminerCard;
