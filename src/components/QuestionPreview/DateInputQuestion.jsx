import CustomButton from "../CustomButton";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function DateInputQuestion({ questionText, questionIndex, styleData }) {
  console.log(styleData);
  return (
    <div className="flex flex-col items-center">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      <input
        type="date"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="날짜를 입력해주세요"
      />
      <CustomButton
        text="다음"
        themeColor={styleData.themeColor}
        buttonShape={styleData.buttonShape}
      />
    </div>
  );
}

export default DateInputQuestion;
