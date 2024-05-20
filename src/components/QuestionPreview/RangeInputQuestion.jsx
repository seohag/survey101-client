import CustomButton from "../CustomButton";

function RangeInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <input
        type="range"
        className="w-full p-2 border border-gray-300 rounded"
      />
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
