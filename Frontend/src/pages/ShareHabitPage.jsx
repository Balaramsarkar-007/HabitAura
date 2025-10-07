import React, { useEffect, useState } from "react";
import {
  Share2,
  Trophy,
  TrendingUp,
  Copy,
  ArrowDownToLine,
} from "lucide-react";
import { useHabit } from "../context/HabitContext";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import goal from "../assist/goal.svg";
import { motion } from "motion/react";

function ShareHabitPage() {
  const { habits } = useHabit();
  const completedHabits = habits.filter((habit) => habit.isCompleted === true);
  const [selectedType, setSelectedType] = useState("Achievements");
  const [selecteCompletedHabit, setSelectedCompletedHabit] = useState(
    completedHabits[0]
  );
  const [copyText, setCopyText] = useState("");

  useEffect(() => {
    if (selecteCompletedHabit) {
      setCopyText(`
    🎯 Milestone Achieved! 

    I'm excited to share that I've successfully maintained my "${selecteCompletedHabit.name}" habit for ${selecteCompletedHabit.streak} consecutive days! 

    This journey has taught me that consistency isn't about perfection - it's about showing up every single day, even when motivation is low. Small daily actions compound into remarkable results.

    Key takeaways from this streak:
    ✅ Consistency beats intensity
    ✅ Progress over perfection
    ✅ Habits shape who we become

    What habit are you working on? I'd love to hear about your journey in the comments!

    #HabitBuilding #PersonalGrowth #Consistency #SelfImprovement #HabitAura
        `);
    }
  }, [selecteCompletedHabit]);

  const types = [
    {
      id: 1,
      name: "Achievements",
      icon1: <Trophy size={26} className="text-gray-600" />,
      icon: <Trophy size={26} className="text-white" />,
    },
    {
      id: 2,
      name: "Progress",
      icon1: <TrendingUp size={26} className="text-gray-600" />,
      icon: <TrendingUp size={26} className="text-white" />,
    },
  ];

  const handleCopyText = (text) => {
    if (!selecteCompletedHabit) {
      toast.error("Please select a habit to copy text");
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleDownloadImage = async () => {
    if (!selecteCompletedHabit) {
      toast.error("Please select a habit to download achievements");
      return;
    }

    try {
      // Get the achievement card element
      const element = document.getElementById("achievement-card");

      if (!element) {
        toast.error("Achievement card not found");
        return;
      }

      // Wait a bit for any animations to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Convert to canvas with optimized settings
      const canvas = await html2canvas(element, {
        backgroundColor: null, // Fallback blue color
        scale: 1, // Start with scale 1 for testing
        useCORS: true,
        allowTaint: true,
        logging: true, // Enable logging to see what's happening
        width: element.offsetWidth,
        height: element.offsetHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false, // Try disabling this
        imageTimeout: 15000,
        removeContainer: false,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });

      // Check if canvas has content
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const hasContent = imageData.data.some((channel) => channel !== 0);

      if (!hasContent) {
        toast.dismiss(loadingToast);
        toast.error("Generated image is blank. Trying alternative method...");
        return;
      }

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            toast.dismiss(loadingToast);
            toast.error("Failed to create image blob");
            return;
          }

          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `${selecteCompletedHabit.name.replace(
            /[^a-z0-9]/gi,
            "_"
          )}-${selecteCompletedHabit.streak}-days-achievement.png`;
          link.href = url;

          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up
          URL.revokeObjectURL(url);

          // Update toast
          toast.dismiss(loadingToast);
          toast.success("Achievement card downloaded successfully!");
        },
        "image/png",
        0.92
      );
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };

  return (
    <div>
      {/* header */}
      <div className="mt-4 mb-2 flex justify-between items-center gap-3">
        <div>
          <h1 className="text-2xl  md:text-4xl font-bold">
            Share Your Progress
          </h1>
          <h3 className="text-sm md:text-base text-gray-500 mt-2">
            Celebrate your achievements and inspire others!
          </h3>
        </div>
        <div className="p-2 md:p-4 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl md:rounded-3xl text-white">
          <Share2 size={38} />
        </div>
      </div>

      {/* select types */}
      <div className="mt-6 flex gap-4">
        {types.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedType(type.name)}
            className={`px-3 md:px-6 py-3 cursor-pointer rounded-2xl flex items-center justify-center gap-2 ${
              selectedType === type.name ? "bg-blue-700" : "border"
            }`}
          >
            {selectedType === type.name ? type.icon : type.icon1}
            <h2
              className={`text-base md:text-lg font-bold ${
                selectedType === type.name ? "text-white" : "text-gray-600"
              }`}
            >
              {type.name}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {selectedType === "Achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* habit share */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full bg-white p-2 md:p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-lg md:text-xl font-bold mt-2">
                Select Habit to Share
              </h2>

              <div className="md:mt-4 overflow-y-auto pr-2 h-120">
                {completedHabits.length === 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-2xl text-center">
                    <img
                      src={goal}
                      alt="Goal"
                      className="mx-auto mb-2 w-80 h-80"
                    />
                    <h3 className="text-lg font-semibold">
                      No completed habits yet!
                    </h3>
                  </div>
                )}

                {completedHabits.map((habit, index) => (
                  <div
                    onClick={() => setSelectedCompletedHabit(habit)}
                    key={index}
                    className={`p-2 md:p-4 flex items-center justify-between rounded-2xl cursor-pointer mt-4 ${
                      selecteCompletedHabit?.id === habit.id
                        ? "border-2 border-blue-600 bg-blue-50"
                        : " hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl p-2 rounded-xl ${habit.bgColor}`}
                      >
                        {habit.logo}
                      </div>
                      <div>
                        <h3 className="text-sm md:text-lg font-bold">{habit.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {habit.current} days streak
                        </p>
                      </div>
                    </div>

                    <div>
                      <h1
                        className={`text-lg md:text-xl font-bold text-blue-600`}
                      >
                        {habit.current}
                      </h1>
                      <p className="text-sm text-gray-500 text-right">days</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full bg-white p-6 rounded-2xl shadow-sm"
            >
              <h2 className="text-bg md:text-xl font-bold mt-2">
                Achievements Card
              </h2>

              <div
                className="mt-6 p-8 rounded-3xl text-white"
                id="achievement-card"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)",
                  minHeight: "300px",
                }}
              >
                <div className="text-xl md:text-6xl text-center">
                  {selecteCompletedHabit?.logo || "🏆"}
                </div>
                <h2 className="text-xl md:text-3xl font-bold mt-4 text-center">
                  Congratulations! 👏
                </h2>
                <h2 className="text-lg md:text-2xl mt-4 text-center font-bold">
                  {selecteCompletedHabit?.current || 0}-Days streak 🔥
                </h2>
                <h3 className="text-lg md:text-xl text-center mt-2">
                  {selecteCompletedHabit?.name || "Your Habit Name"}
                </h3>
                <div
                  className="mt-6 p-4 rounded-2xl w-full text-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <p className="text-sm md:text-base">
                    Building better habits with
                  </p>
                  <h3 className="text-lg md:text-xl font-bold mt-1">
                    HabitAura❤️
                  </h3>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  className="w-full bg-gray-200 text-center p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handleCopyText(copyText)}
                >
                  <Copy size={24} strokeWidth={2.5} />
                  <span className="text-sm md:text-lg font-semibold">
                    Copy Text
                  </span>
                </button>

                <button
                  className="w-full bg-blue-600 text-white text-center p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 cursor-pointer"
                  onClick={() => handleDownloadImage()}
                >
                  <ArrowDownToLine size={24} strokeWidth={2.5} />
                  <span className="text-sm md:text-base font-semibold">
                    Download Achievements
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareHabitPage;
