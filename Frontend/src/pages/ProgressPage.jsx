import React from "react";
import {
  ChartSpline,
  Target,
  Flame,
  TrendingUp,
  Trophy,
  LineChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import OverViewHabitCard from "../components/dashboard/overview/OverViewHabitCard";
import { useHabit } from "../context/HabitContext";
import { motion } from "motion/react";

function ProgressPage() {
  const { habitStats, weaklyProgress, categoryStats, monthlyActivity } =
    useHabit();
  const stats = [
    {
      title: "Active Habits",
      value: habitStats.totalActiveHabits,
      icon: Target,
      color: "bg-blue-500",
      change: "+2 this month",
    },
    {
      title: "Current Streak",
      value: habitStats.currentStreak,
      icon: Flame,
      color: "bg-orange-500",
      change: "+5 days",
    },
    {
      title: "Completion Rate",
      value: habitStats.totalProgress + "%",
      icon: TrendingUp,
      color: "bg-green-500",
      change: "+12% this week",
    },
    {
      title: "Achievements",
      value: habitStats.achievements,
      icon: Trophy,
      color: "bg-purple-500",
      change: "2 new this month",
    },
  ];

  const getIntensityColor = (percentage) => {
    if (percentage === 0) return "bg-gray-100";
    if (percentage <= 25) return "bg-green-200";
    if (percentage <= 50) return "bg-green-300";
    if (percentage <= 75) return "bg-green-400";
    return "bg-green-500";
  };

  // category stats
  const allCategory = [
    "Fitness",
    "Health",
    "Productivity",
    "Learning",
    "Mindfulness",
    "Lifestyle",
    "Creativity",
    "Others",
  ];
  const categoryData = allCategory.map((category) => {
    const progress = categoryStats.find(
      (item) => item.name === category.toLowerCase()
    );
    return {
      name: category,
      percentage: progress?.catPerComplitions || 0,
      avgStreak: progress?.avgStreak || 0,
      catCount: progress?.count || 0,
    };
  });

  return (
    <div className="md:mt-4">
      {/* header */}
      <div>
        <div className="flex items-center">
          <h1 className="text-2xl md:text-4xl font-bold">Progress Tracking </h1>
          <div className="ml-2 p-2 bg-green-100 rounded-xl">
            <ChartSpline
              className="inline-block"
              size={30}
              color="green"
              strokeWidth={2.2}
            />
          </div>
        </div>
        <p className="md:mt-2 text-gray-600 text-sm md:text-base">
          Visualize your habit journey and improvements
        </p>
      </div>

      {/* progress staus */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:mt-4 gap-2 md:gap-6">
        {/* habit overview display */}
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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

      {/* progress graphs status */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* weakly complition */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-3xl bg-white shadow-sm"
        >
          <h2 className="text-lg md:text-2xl font-bold mt-4 ml-6 mb-2">
            Weekly Completion
          </h2>

          <div className="mt-6 w-full">
            <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 300 : 600}>
              <BarChart data={weaklyProgress} >
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="day" className="text-sm md:text-lg"/>
                <YAxis  className="text-sm md:text-lg"/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="percentage"
                  fill="#3B82F6"
                  barSize={70}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* category progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full rounded-2xl bg-white shadow-sm"
        >
          <h2 className="text-lg md:text-2xl font-bold mt-4 md:ml-6 mb-2">
            Category Progress
          </h2>

          {categoryData.map((category, index) => (
            <div className="mt-3 w-full px-4" key={index}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-base font-semibold">
                  {category.name}
                </h2>
                <p className="text-sm md:text-base font-semibold">
                  {category.percentage}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-gray-500">
                <h2 className="text-xs md:text-sm">
                  {category.catCount} habits
                </h2>
                <p className="text-xs md:text-sm">
                  {category.avgStreak} avg. streak
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Monthly activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-6 rounded-2xl bg-white shadow-sm"
      >
        <div className="mt-2 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">Monthly Activity</h1>
          <div className="flex justify-center items-center gap-1">
            <div className="text-sm md:text-base text-gray-500">Less</div>
            <div className="h-4 w-4 bg-green-100 rounded-sm"></div>
            <div className="h-4 w-4 bg-green-300 rounded-sm"></div>
            <div className="h-4 w-4 bg-green-400 rounded-sm"></div>
            <div className="h-4 w-4 bg-green-600 rounded-sm"></div>
            <div className="text-sm md:text-base text-gray-500">More</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {monthlyActivity.map((day, index) => (
              <div
                key={index}
                className={`flex items-center justify-center font-bold text-xs md:text-sm h-10 w-10 rounded-sm cursor-pointer text-gray-600 hover:border-2 hover:border-blue-400 
               ${
                 day.completed === 0
                   ? "bg-gray-100"
                   : getIntensityColor(day.complitionPer)
               }`}
              >
                {day.date}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProgressPage;
