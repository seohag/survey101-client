import CustomButton from "../CustomButton";

function PhoneInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <input
        type="tel"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="전화번호를 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default PhoneInputQuestion;
