import CustomButton from "../CustomButton";

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
              <div className="mt-4 flex flex-col items-center">
                {selectedQuestion.options.map((option) => (
                  <CustomButton
                    key={option.optionId}
                    text={option.text}
                    themeColor={styleData.themeColor}
                    buttonShape={styleData.buttonShape}
                  />
                ))}
              </div>
            )}
            {selectedQuestion.questionType === "imageChoice" && (
              <div className="flex flex-wrap justify-center mt-4">
                {selectedQuestion.options.map((option) => (
                  <button key={option.optionId} className="mb-4 mx-2">
                    {option.image && (
                      <img
                        src={
                          typeof option.image === "string"
                            ? option.image
                            : URL.createObjectURL(option.image)
                        }
                        alt={`${option.optionId}`}
                        className="w-24 h-24 object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            {selectedQuestion.questionType === "textInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="텍스트를 입력해주세요"
                />
                <CustomButton
                  text="다음"
                  themeColor={styleData.themeColor}
                  buttonShape={styleData.buttonShape}
                />
              </div>
            )}
            {selectedQuestion.questionType === "emailInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="이메일을 입력해주세요"
                />
                <CustomButton
                  text="다음"
                  themeColor={styleData.themeColor}
                  buttonShape={styleData.buttonShape}
                />
              </div>
            )}
            {selectedQuestion.questionType === "phoneInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="전화번호를 입력해주세요"
                />
                <CustomButton
                  text="다음"
                  themeColor={styleData.themeColor}
                  buttonShape={styleData.buttonShape}
                />
              </div>
            )}
            {selectedQuestion.questionType === "numberInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="숫자를 입력해주세요"
                />
                <CustomButton
                  text="다음"
                  themeColor={styleData.themeColor}
                  buttonShape={styleData.buttonShape}
                />
              </div>
            )}
            {selectedQuestion.questionType === "dateInput" && (
              <div className="mt-4 flex flex-col items-center">
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
            )}
            {selectedQuestion.questionType === "timeInput" && (
              <div className="mt-4 flex flex-col items-center">
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
            )}
            {selectedQuestion.questionType === "rangeInput" && (
              <div className="mt-4 flex flex-col items-center">
                <input
                  type="range"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="mt-4">
                  <CustomButton
                    text="다음"
                    themeColor={styleData.themeColor}
                    buttonShape={styleData.buttonShape}
                  />
                </div>
              </div>
            )}
            {selectedQuestion.questionType === "radioInput" && (
              <div className="mt-4 flex flex-col">
                <div className="flex justify-center items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="mr-2">
                      <input type="radio" value={rating} className="hidden" />
                      <span
                        className={`text-3xl ${rating ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
                      >
                        ★
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <CustomButton
                    text="다음"
                    themeColor={styleData.themeColor}
                    buttonShape={styleData.buttonShape}
                  />
                </div>
              </div>
            )}
            {selectedQuestion.questionType === "selectInput" && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionPreview;
