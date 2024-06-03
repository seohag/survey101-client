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

function QuestionPreview({ selectedQuestionId }) {
  const { questions, styleData } = useFormEditorStore();
  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  const SpecificQuestionComponent =
    selectedQuestion && questionComponents[selectedQuestion.questionType];

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[80vh]">
      <div className="text-center">
        {selectedQuestion && (
          <div className="p-4 border border-gray-300 rounded min-h-[80vh] min-w-[30vw]">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: styleData.themeColor }}
            >
              {selectedQuestion.questionText}
            </h3>
            <SpecificQuestionComponent
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
