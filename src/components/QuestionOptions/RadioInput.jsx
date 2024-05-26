function RadioInput({ question }) {
  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3, 4, 5].map((rating) => (
        <label key={rating} className="inline-block mr-2">
          <input
            type="radio"
            checked={question.answer === rating}
            className="hidden"
            readOnly
          />
          <span
            className={`text-3xl ${rating <= question.answer ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
          >
            ★
          </span>
        </label>
      ))}
    </div>
  );
}

export default RadioInput;
