import React, { useEffect, useState } from "react";
import { X, Bell, Clock3 } from "lucide-react";
import ToggleBtn from "../../buttons/ToggleBtn";
import { useForm } from "react-hook-form";
import CustomBtn from "../../buttons/CustomBtn";
import { useHabit } from "../../../context/HabitContext";

function EditReminder({ onClose, habit }) {
  const {editReminder} = useHabit();
  const [handelToggele, setHandelToggele] = useState(habit.reminder.active);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  useEffect(() => {
    if(habit) {
        setValue('reminderTime', habit.reminder.time);
    }
  }, [habit])

  const handelToggeleData = () => {
    setHandelToggele(!handelToggele);
  };

  const onSubmit = (data) => {
    reset();
    onClose()

    const newReminderData = {
        id : habit._id,
        reminder : {
            active : handelToggele,
            time : data.reminderTime || habit.reminder.time,
            freq : habit.reminder.freq || 'daily',
        }
    }
    
    editReminder(newReminderData);    
  };
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`${habit.bgColor} p-2 text-2xl rounded-2xl`}>{habit.logo}</div>
          <div>
            <h2 className="text-lg md:text-xl font-bold">Edit Reminder</h2>
            <h3 className="text-base md:text-lg">{habit.name}</h3>
          </div>
        </div>
        <div
          className="hover:bg-gray-200 p-2 rounded-xl cursor-pointer"
          onClick={onClose}
        >
          <X
            className="text-gray-500 hover:text-gray-700"
            size={22}
            strokeWidth={2.5}
          />
        </div>
      </div>

      <div className="px-4 py-8 bg-[#F9FAFB] rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Bell className="text-gray-700" size={24} />
          <div>
            <h1 className="text-base md:text-lg font-semibold">
              Enable Reminder
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              Get notified to complete this habit
            </p>
          </div>
        </div>

        <ToggleBtn isChecked={handelToggele} onToggle={handelToggeleData} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {handelToggele && (
          <div>
            <div className="mt-6">
              <h2 className="text-sm md:text-base font-semibold">
                Reminder Time
              </h2>
              <div className="flex items-center space-x-4 mt-4">
                <Clock3 className="text-gray-600" size={24} />
                <input
                  type="time"
                  defaultValue={"09:00"}
                  className="border border-gray-300 rounded-md p-4 cursor-pointer"
                  {...register("reminderTime")}
                />
              </div>
            </div>

            <div className="mt-6 bg-[#F9FAFB] rounded-2xl p-4 py-8">
              <h1 className="text-base md:text-lg">Reminder frequency</h1>
              <p className="text-sm md:text-base text-gray-500">
                {habit.reminder.freq} reminder (based on habit frequency)
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl flex items-center space-x-6">
                <Clock3 className="text-blue-600" size={24} />
                <div>
                    <h2 className="text-base md:text-lg text-blue-900 font-semibold">Preview Reminder</h2>
                    <p className="text-sm md:text-base text-blue-700">You'll be reminded {habit.reminder.freq} at {watch("reminderTime") || "09:00"} to complete "{habit.name}"</p>
                </div>
            </div>
          </div>
        )}

        {/* submit button */}
        <div className="flex gap-4 mt-6 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <CustomBtn
            text={handelToggele ? "Save Reminder" : "Remove Reminder"}
            type="submit"
            customClass="flex-1"
            bgColor="bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
}

export default EditReminder;
