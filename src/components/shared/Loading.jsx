import React from "react";

function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8">
        <span>데이터를 불러오는 중입니다...</span>
        <p className="text-gray-800 font-semibold mt-4">
          <div className="w-40 h-4 bg-gray-200 rounded-full">
            <div className="w-24 h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Loading;
