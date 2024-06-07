import CustomButton from "../CustomButton";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function TextInputQuestion({ questionText, questionIndex, styleData }) {
  return (
    <div className="flex flex-col items-center">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="텍스트를 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default TextInputQuestion;
