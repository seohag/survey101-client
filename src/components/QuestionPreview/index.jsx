import { useState } from "react";

function QuestionPreview() {
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px] min-w-[301.594px]">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-4">Question Preview</h2>
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[301.594px]">
          <h3 className="text-xl font-bold mb-4">question</h3>
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
