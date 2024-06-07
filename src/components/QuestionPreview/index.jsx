import { useEffect } from "react";
import useFormEditorStore from "../../store/useFormEditorStore";

import TextChoiceQuestion from "./TextChoiceQuestion";
import ImageChoiceQuestion from "./ImageChoiceQuestion";
import TextInputQuestion from "./TextInputQuestion";
import EmailInputQuestion from "./EmailInputQuestion";
import PhoneInputQuestion from "./PhoneInputQuestion";
import NumberInputQuestion from "./NumberInputQuestion";
import DateInputQuestion from "./DateInputQuestion";
import TimeInputQuestion from "./TimeInputQuestion";
import RadioInputQuestion from "./RadioInputQuestion";
import RangeInputQuestion from "./RangeInputQuestion";

const questionComponents = {
  textChoice: TextChoiceQuestion,
  imageChoice: ImageChoiceQuestion,
  textInput: TextInputQuestion,
  emailInput: EmailInputQuestion,
  phoneInput: PhoneInputQuestion,
  numberInput: NumberInputQuestion,
  dateInput: DateInputQuestion,
  timeInput: TimeInputQuestion,
  radioInput: RadioInputQuestion,
  rangeInput: RangeInputQuestion,
};

function QuestionPreview({ selectedQuestionId, setSelectedQuestionId }) {
  const { questions, styleData } = useFormEditorStore();

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

  const SpecificQuestionComponent =
    selectedQuestion && questionComponents[selectedQuestion.questionType];

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
            <SpecificQuestionComponent
              questionText={selectedQuestion.questionText}
              questionIndex={questionIndex}
              styleData={styleData}
              options={selectedQuestion.options}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreview;
