function AddQuestionPopup({ handleClosePopup, handleAddQuestion }) {
  function handleClickOutside(event) {
    if (event.target.classList.contains("modal-background")) {
      handleClosePopup();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center modal-background"
      onClick={handleClickOutside}
      role="presentation"
    >
      <div className="bg-white p-4 rounded-lg w-80 max-h-96 overflow-y-auto relative">
        <div className="sticky -top-4 left-0 right-0 bg-white p-2 rounded-t-lg border-b z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">질문 추가</h3>
            <button
              className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
              onClick={handleClosePopup}
            >
              닫기
            </button>
          </div>
        </div>
        <div className="pt-16">
          <div>
            <h4 className="text-md font-bold mb-2">선택</h4>
            <div className="flex flex-col mb-4">
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("textChoice")}
              >
                텍스트
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("imageChoice")}
              >
                이미지
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-md font-bold mb-2">입력</h4>
            <div className="flex flex-col">
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("textInput")}
              >
                텍스트 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("emailInput")}
              >
                이메일 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("phoneInput")}
              >
                전화번호 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("numberInput")}
              >
                숫자 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("timeInput")}
              >
                시간 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("dateInput")}
              >
                날짜 입력
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("rangeInput")}
              >
                슬라이더
              </button>
              <button
                className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
                onClick={() => handleAddQuestion("radioInput")}
              >
                별점
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionPopup;
