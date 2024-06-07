function QuestionHeader({ questionIndex, questionText, themeColor }) {
  return (
    <div className="text-center">
      <h4 className="text-lg font-bold mb-7" style={{ color: themeColor }}>
        Q{questionIndex + 1}.
      </h4>
      <h3 className="text-l font-bold mb-4" style={{ color: themeColor }}>
        {questionText}
      </h3>
    </div>
  );
}

export default QuestionHeader;
