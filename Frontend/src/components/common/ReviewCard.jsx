import React from "react";

function ReviewCard({ review, userName, nameUpperLatter, logoBgColor = "bg-teal-100", logoLatterColor = "text-teal-800" }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mb-8 flex flex-col min-h-[200px]">
      {/* heading section */}
      <div className="flex justify-start items-center">
        <div className={`w-14 h-14 rounded-full ${logoBgColor} flex items-center justify-center mr-4`}>
          <h2 className={`${logoLatterColor} text-xl font-semibold`}>
            {nameUpperLatter}
          </h2>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{userName}</h1>
      </div>

      {/* Description */}
      <div className="mt-4 flex-grow">
        <p className="text-gray-600 text-lg">{review}</p>
      </div>

      {/* rating */}
      <div className="mt-auto flex items-center">
        <span className="text-yellow-500 text-lg font-semibold">★★★★★</span>
      </div>
    </div>
  );
}

export default ReviewCard;
