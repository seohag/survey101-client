import { useState, useEffect } from "react";

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

function QuestionPreview() {
  const { questions, styleData } = useFormEditorStore();
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedQuestionId(questions[0].questionId);
    }
  }, [questions]);

  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  if (!selectedQuestion) {
    return null;
  }

  const SpecificQuestionComponent =
    questionComponents[selectedQuestion.questionType];

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[351px]">
          <h3 className="text-xl font-bold mb-4">
            {selectedQuestion.questionText}
          </h3>
          {SpecificQuestionComponent && (
            <SpecificQuestionComponent
              styleData={styleData}
              options={selectedQuestion.options}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
