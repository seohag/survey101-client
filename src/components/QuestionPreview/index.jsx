import { useEffect } from "react";
import useFormEditorStore from "../../store/useFormEditorStore";

import PreviewQuestionComponent from "./PreviewQuestionComponent";
import TextChoiceField from "./TextChoiceField";
import ImageChoiceField from "./ImageChoiceField";
import TextInputField from "./TextInputField";
import EmailInputField from "./EmailInputField";
import DateInputField from "./DateInputField";
import PhoneInputField from "./PhoneInputField";
import NumberInputField from "./NumberInputField";
import TimeInputField from "./TimeInputField";
import RadioInputField from "./RadioInputField";
import RangeInputField from "./RangeInputField";

const inputFields = {
  textChoice: TextChoiceField,
  imageChoice: ImageChoiceField,
  textInput: TextInputField,
  emailInput: EmailInputField,
  phoneInput: PhoneInputField,
  numberInput: NumberInputField,
  dateInput: DateInputField,
  timeInput: TimeInputField,
  radioInput: RadioInputField,
  rangeInput: RangeInputField,
};

const inputQuestionTypes = [
  "textInput",
  "emailInput",
  "phoneInput",
  "numberInput",
  "dateInput",
  "timeInput",
  "radioInput",
  "rangeInput",
];

function QuestionPreview({ selectedQuestionId, setSelectedQuestionId }) {
  const { questions } = useFormEditorStore();

  useEffect(() => {
    if (!selectedQuestionId && questions.length > 0) {
      setSelectedQuestionId(questions[0].questionId);
    }
  }, [selectedQuestionId, questions, setSelectedQuestionId]);

  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  const questionIndex = questions.findIndex(
    (question) => question.questionId === selectedQuestionId,
  );

  const InputField =
    selectedQuestion && inputFields[selectedQuestion.questionType];

  const showNextButton = inputQuestionTypes.includes(
    selectedQuestion?.questionType,
  );

  return (
    <div className="flex flex-col justify-center items-center p-4 rounded-lg bg-gray-200">
      <span className="mb-4 text-center font-bold">미리보기</span>
      <div
        className={`bg-white rounded-lg shadow-lg flex flex-col items-center min-h-[76vh] max-h-[76vh] max-w-[25vw] ${
          selectedQuestion ? "border-4 border-black" : ""
        }`}
      >
        {selectedQuestion && (
          <div className="flex flex-col items-center p-4 w-full overflow-auto max-h-full scrollbar-hide">
            <PreviewQuestionComponent
              questionText={selectedQuestion.questionText}
              questionIndex={questionIndex}
              inputField={InputField}
              options={selectedQuestion.options}
              showNextButton={showNextButton}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreview;
