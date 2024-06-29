import QuestionPreviewHeader from "../shared/QuestionPreviewHeader";
import CustomButton from "../CustomButton";
import useFormEditorStore from "../../store/useFormEditorStore";

function PreviewQuestionComponent({
  questionIndex,
  questionText,
  inputField: InputField,
  options,
  showNextButton,
}) {
  const { styleData } = useFormEditorStore();

  return (
    <div className="flex flex-col items-center">
      <QuestionPreviewHeader
        questionIndex={questionIndex}
        questionText={questionText}
        themeColor={styleData.themeColor}
      />
      <InputField options={options} />
      {showNextButton && (
        <CustomButton
          text="다음"
          themeColor={styleData.themeColor}
          buttonShape={styleData.buttonShape}
        />
      )}
    </div>
  );
}

export default PreviewQuestionComponent;
