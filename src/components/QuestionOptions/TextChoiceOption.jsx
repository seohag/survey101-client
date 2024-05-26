function TextChoiceOption({
  question,
  option,
  handleQuestionOptionChange,
  handleDeleteOption,
}) {
  return (
    <div key={option.optionId} className="flex items-center mb-2">
      <input
        type="text"
        onChange={(event) => {
          handleQuestionOptionChange(
            question.questionId,
            option.optionId,
            event.target.value,
          );
        }}
        value={option.text}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="옵션을 입력해주세요"
      />
      {question.options.length > 1 && (
        <button
          onClick={() =>
            handleDeleteOption(question.questionId, option.optionId)
          }
          className="bg-red-500 text-white px-1 rounded"
        >
          X
        </button>
      )}
    </div>
  );
}

export default TextChoiceOption;
