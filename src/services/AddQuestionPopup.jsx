function AddQuestionPopup({ handleClosePopup, handleAddQuestion }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-80 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Add Question</h3>
        <div>
          <h4 className="text-md font-bold mb-2">선택</h4>
          <div className="flex flex-col mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("text")}
            >
              Text
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("image")}
            >
              Image
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-md font-bold mb-2">입력</h4>
          <div className="flex flex-col">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("textInput")}
            >
              Text Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("emailInput")}
            >
              Email Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("phoneInput")}
            >
              Phone Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("numberInput")}
            >
              Number Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("timeInput")}
            >
              Time Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("dateInput")}
            >
              Date Input
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("slider")}
            >
              Slider
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("star")}
            >
              Star Rating
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => handleAddQuestion("dropdown")}
            >
              Dropdown
            </button>
          </div>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleClosePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddQuestionPopup;
