function CoverStylePreview({ coverData, styleData }) {
  const { title, subtitle, coverImage, startButtonText } = coverData;
  const { themeColor, buttonShape } = styleData;

  function getBrightness(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  const brightness = getBrightness(styleData.themeColor);
  const textColor = brightness < 128 ? "#FFFFFF" : "#000000";

  let buttonClassName = "text-white mt-7 px-7 py-2 ";
  if (buttonShape === "rounded") {
    buttonClassName += "rounded";
  } else if (buttonShape === "square") {
    buttonClassName += "square";
  } else {
    buttonClassName += "rounded-full";
  }

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <h2 className="text-lg font-bold mb-4">CoverStylePreview</h2>
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[301.594px]">
          <h3 className="text-xl font-bold mb-4" style={{ color: themeColor }}>
            {title}
          </h3>
          <p className="text-sm mb-6" style={{ color: themeColor }}>
            {subtitle}
          </p>
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Cover"
              className="mb-2 w-[380px] h-[380px] object-contain"
            />
          )}
          <button
            className={buttonClassName}
            style={{
              backgroundColor: styleData.themeColor,
              color: textColor,
            }}
          >
            {startButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoverStylePreview;
