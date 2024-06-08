function QuestionTitle({ question, handleQuestionTextChange }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={`questionText-${question.questionId}`}
        className="block mb-2"
      >
        <input
          type="text"
          id={`questionText-${question.questionId}`}
          value={question.questionText}
          onChange={(event) =>
            handleQuestionTextChange(question.questionId, event.target.value)
          }
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="질문을 입력해주세요"
        />
      </label>
    </div>
  );
}

export default QuestionTitle;
