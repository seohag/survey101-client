function AddQuestionPopupButton({ onClick, children }) {
  return (
    <button
      className="bg-gray-300 text-[#4E5968] px-4 py-2 mb-2 rounded-md hover:bg-gray-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AddQuestionPopupButton;
