import CustomButton from "../CustomButton";

function NumberInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <input
        type="number"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="숫자를 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default NumberInputQuestion;
