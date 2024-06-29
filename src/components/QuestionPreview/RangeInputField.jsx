import { useState } from "react";
import useFormEditorStore from "../../store/useFormEditorStore";

function RangeInputField() {
  const { styleData } = useFormEditorStore();

  const [rangeValue, setRangeValue] = useState(50);
  function handleRangeChange(event) {
    setRangeValue(event.target.value);
  }

  const thumbSize = 16 + (rangeValue / 100) * 16;

  return (
    <div className="w-full flex flex-col items-center">
      <input
        type="range"
        className="w-full h-2 bg-[#AFB8C1] rounded-lg appearance-none cursor-pointer"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        style={{
          accentColor: styleData.themeColor,
          "--thumb-size": `${thumbSize}px`,
        }}
      />
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: ${thumbSize}px;
            height: ${thumbSize}px;
            border-radius: 50%;
            background: ${styleData.themeColor};
            cursor: pointer;
          }

          input[type="range"]::-moz-range-thumb {
            width: ${thumbSize}px;
            height: ${thumbSize}px;
            border-radius: 50%;
            background: ${styleData.themeColor};
            cursor: pointer;
          }
        `}
      </style>
      <div
        className="mt-2 text-lg font-bold"
        style={{ color: styleData.themeColor }}
      >
        {rangeValue}
      </div>
    </div>
  );
}

export default RangeInputField;
