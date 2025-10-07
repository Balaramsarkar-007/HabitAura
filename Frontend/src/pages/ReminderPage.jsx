import React from "react";
import { NotepadText, Bell, Clock4, PenLine, Trash2 } from "lucide-react";
import { useHabit } from "../context/HabitContext";
import OverViewHabitCard from "../components/dashboard/overview/OverViewHabitCard";
import ReminderCard from "../components/dashboard/reminder/ReminderCard";
import ActiveReminerCard from "../components/dashboard/reminder/ActiveReminerCard";
import { motion } from "motion/react";

function ReminderPage() {
  const { habitStats, habits, disableReminder } = useHabit();

  const stats = [
    {
      title: "Total Habits",
      value: habitStats.totalActiveHabits,
      icon: NotepadText,
      color: "bg-blue-500",
      change: "Habits in your routine",
    },
    {
      title: "Active Reminders",
      value: habitStats.activeReminders,
      icon: Bell,
      color: "bg-green-500",
      change: "Notifications enabled",
    },
    {
      title: "Completed Today",
      value: habitStats.todayComplated,
      icon: Clock4,
      color: "bg-purple-500",
      change: "Habits done today",
    },
  ];

  const handleDisableReminder = (id) => {
    disableReminder(id);
  };

  return (
    <div>
      {/* header */}
      <div className="md:mt-4">
        <h1 className="text-2xl md:text-4xl font-bold">Reminder Page 🔔</h1>
        <p className="text-gray-600 text-sm md:text-base md:mt-2">
          Set and manage your habit reminders to stay on track!
        </p>
      </div>

      {/* reminder stats */}
      <div className="md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OverViewHabitCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={<stat.icon className="w-8 h-8 text-white" />}
              color={stat.color}
              change={stat.change}
            />
          </motion.div>
        ))}
      </div>

      {/* upcoming reminders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 bg-white p-4 md:p-8 rounded-2xl shadow-sm"
      >
        {/* header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-2xl font-bold text-gray-700">
            Upcoming Reminders ⏰
          </h2>
          <h4 className="text-sm md:text-base text-gray-500">Next 24 hours</h4>
        </div>

        {habits.filter((habit) => habit.reminder.active).length === 0 && (
          <p className="text-gray-500 text-sm md:text-base mt-4">
            No active reminders. Set reminders for your habits to get notified!
          </p>
        )}

        <div className="mt-4">
          {habits.map(
            (habit, index) =>
              habit.reminder.active && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <ActiveReminerCard
                    key={index}
                    habit={habit}
                    onDisable={handleDisableReminder}
                  />
                </motion.div>
              )
          )}
        </div>
      </motion.div>

      {/* Reminder settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-white rounded-2xl shadow-sm"
      >
        <h2 className="text-lg md:text-2xl font-bold text-gray-700">
          Reminder Settings
        </h2>

        {habits.length === 0 && (
          <p className="text-gray-500 mt-4 text-sm md:text-base">
            No active habits are present. Please add some habits to set
            reminders!
          </p>
        )}

        <div className="mt-4">
          {habits.map((habit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
            >
              <ReminderCard key={index} habit={habit} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ReminderPage;
