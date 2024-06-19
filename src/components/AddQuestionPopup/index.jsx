import AddQuestionPopupButton from "../AddQuestionPopupButton";

function AddQuestionPopup({ handleClosePopup, handleAddQuestion }) {
  function handleClickOutside(event) {
    if (event.target.classList.contains("modal-background")) {
      handleClosePopup();
    }
  }

  function handleAddQuestionAndClose(questionType) {
    handleAddQuestion(questionType);
    handleClosePopup();
  }

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center modal-background z-10"
      onClick={handleClickOutside}
      role="presentation"
    >
      <div className="bg-white p-4 rounded-lg w-80 max-h-96 overflow-y-auto relative">
        <div className="sticky -top-4 left-0 right-0 bg-white p-2 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">질문 추가</h3>
            <button
              className="bg-gray-300 text-[#4E5968] px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={handleClosePopup}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="pt-10">
          <div>
            <h4 className="text-md font-bold mb-2">선택</h4>
            <div className="flex flex-col mb-4">
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("textChoice")}
              >
                텍스트
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("imageChoice")}
              >
                이미지
              </AddQuestionPopupButton>
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold mb-2">입력</h4>
            <div className="flex flex-col">
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("textInput")}
              >
                텍스트 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("emailInput")}
              >
                이메일 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("phoneInput")}
              >
                전화번호 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("numberInput")}
              >
                숫자 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("timeInput")}
              >
                시간 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("dateInput")}
              >
                날짜 입력
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("rangeInput")}
              >
                슬라이더
              </AddQuestionPopupButton>
              <AddQuestionPopupButton
                onClick={() => handleAddQuestionAndClose("radioInput")}
              >
                별점
              </AddQuestionPopupButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionPopup;
