import CustomButton from "../CustomButton";
import QuestionHeader from "../shared/QuestionPreviewHeader";

function TextChoiceQuestion({
  questionText,
  questionIndex,
  options,
  styleData,
}) {
  return (
    <div className="flex flex-col items-center">
      <QuestionHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      {options.map((option) => (
        <CustomButton
          key={option.optionId}
          text={option.text}
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      ))}
    </div>
  );
}

export default TextChoiceQuestion;
