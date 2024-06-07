import useFormEditorStore from "../../store/useFormEditorStore";

function ReadOnlyInput({ type, placeholder }) {
  const { styleData } = useFormEditorStore();

  if (type === "range") {
    return (
      <input
        type="range"
        className="w-full h-2 bg-[#AFB8C1] rounded-lg appearance-none cursor-pointer"
        min="0"
        max="100"
        style={{ accentColor: styleData.themeColor }}
        readOnly
      />
    );
  }

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
