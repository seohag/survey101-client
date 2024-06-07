import CustomButton from "../CustomButton";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function TimeInputQuestion({ questionText, questionIndex, styleData }) {
  return (
    <div className="flex flex-col items-center">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
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
