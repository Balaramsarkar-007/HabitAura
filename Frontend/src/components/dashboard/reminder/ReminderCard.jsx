import React, { useEffect, useState } from "react";
import { PenLine } from "lucide-react";
import ToggleBtn from "../../buttons/ToggleBtn";
import EditReminder from "./EditReminder";
import { useHabit } from "../../../context/HabitContext";

function ReminderCard({ habit }) {
  const {editReminder} = useHabit();
  const [showEdit, setShowEdit] = useState(false);
  const [handelToggele, setHandelToggele] = useState(habit.reminder.active);

  useEffect(() => {
    setHandelToggele(habit.reminder.active);
  }, [habit.reminder.active, habit]);

  const handelToggeleData = () => {
    setHandelToggele(!handelToggele);
    const newReminderData = {
        id : habit._id,
        reminder : {
            active : !handelToggele,
            time : habit.reminder.time,
            freq : habit.reminder.freq || 'daily',
        }
    }
    editReminder(newReminderData);
  }

  return (
    <div className="mb-4 p-2 md:p-4 rounded-xl border border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-1 md:space-x-4">
        <div className={`${habit.bgColor} p-1 md:p-2 rounded-xl text-2xl md:text-3xl`}>
          {habit.logo}
        </div>
        <div>
          <h2 className="text-sm md:text-lg font-semibold">{habit.name}</h2>
          <p className="text-xs md:text-sm text-gray-500">{habit.des}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6">
        <div>
          <p className="text-xs md:text-base font-semibold">
            {habit.reminder.time}
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            {habit.reminder.freq}
          </p>
        </div>
        <ToggleBtn isChecked={handelToggele} onToggle={() => handelToggeleData()} />
        <div className="hover:bg-gray-200 md:p-2 rounded-xl">
          <PenLine
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            size={18}
            onClick={() => setShowEdit(true)}
          />
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-gray-600/30 backdrop-blur flex items-center justify-center z-50">
          <EditReminder habit={habit} onClose={() => setShowEdit(false)} />
        </div>
      )}
    </div>
  );
}

export default ReminderCard;
