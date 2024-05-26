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

function QuestionPreview({ selectedQuestionId }) {
  const { questions, styleData } = useFormEditorStore();
  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        {selectedQuestion && (
          <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[350.594px]">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: styleData.themeColor }}
            >
              {selectedQuestion.questionText}
            </h3>
            {selectedQuestion.questionType === "textChoice" && (
              <TextChoiceQuestion
                styleData={styleData}
                options={selectedQuestion.options}
              />
            )}
            {selectedQuestion.questionType === "imageChoice" && (
              <ImageChoiceQuestion
                styleData={styleData}
                options={selectedQuestion.options}
              />
            )}
            {selectedQuestion.questionType === "textInput" && (
              <TextInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "emailInput" && (
              <EmailInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "phoneInput" && (
              <PhoneInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "numberInput" && (
              <NumberInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "dateInput" && (
              <DateInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "timeInput" && (
              <TimeInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "rangeInput" && (
              <RangeInputQuestion styleData={styleData} />
            )}
            {selectedQuestion.questionType === "radioInput" && (
              <RadioInputQuestion styleData={styleData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreview;
