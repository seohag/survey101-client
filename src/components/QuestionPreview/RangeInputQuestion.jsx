import { useState } from "react";
import CustomButton from "../CustomButton";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function RangeInputQuestion({ questionText, questionIndex, styleData }) {
  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      <div className="w-full flex flex-col items-center">
        <input
          type="range"
          className="w-full h-2 bg-[#AFB8C1] rounded-lg appearance-none cursor-pointer"
          min="0"
          max="100"
          value={rangeValue}
          onChange={handleRangeChange}
          style={{ accentColor: styleData.themeColor }}
        />
        <div
          className="mt-2 text-lg font-bold"
          style={{ color: styleData.themeColor }}
        >
          {rangeValue}
        </div>
      </div>
      <div className="mt-4">
        <CustomButton
          text="다음"
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      </div>
    </div>
  );
}

export default RangeInputQuestion;
