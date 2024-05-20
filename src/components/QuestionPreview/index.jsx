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

function QuestionPreview({ questions, styleData, selectedQuestionId }) {
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
                options={selectedQuestion.options}
                styleData={styleData}
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
            {/* {selectedQuestion.questionType === "selectInput" && (
              <div className="mt-4 flex flex-col items-center">
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option value="">옵션을 선택해주세요</option>
                  <option value="whale">고래</option>
                  <option value="dog">개</option>
                  <option value="cat">고양이</option>
                  <option value="giraffe">기린</option>
                  <option value="tiger">호랑이</option>
                  <option value="lion">사자</option>
                </select>
                <div className="mt-4">
                  <CustomButton
                    text="다음"
                    themeColor={styleData.themeColor}
                    buttonShape={styleData.buttonShape}
                  />
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreview;
