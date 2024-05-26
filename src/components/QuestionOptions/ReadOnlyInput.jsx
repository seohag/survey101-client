function ReadOnlyInput({ type, placeholder }) {
  return (
    <input
      type={type}
      className="w-full p-2 border border-gray-300 rounded"
      placeholder={placeholder}
      readOnly
    />
  );
}

export default ReadOnlyInput;
