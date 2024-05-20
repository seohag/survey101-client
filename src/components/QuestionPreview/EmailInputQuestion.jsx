import CustomButton from "../CustomButton";

function EmailInputQuestion({ styleData }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <input
        type="email"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="이메일을 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default EmailInputQuestion;
