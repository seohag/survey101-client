import CustomButton from "../CustomButton";

function TimeInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <input
        type="time"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="시간을 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default TimeInputQuestion;
