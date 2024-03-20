import CustomButton from "../CustomButton";

function CoverStylePreview({ coverData, styleData }) {
  const { title, subtitle, coverImage, startButtonText } = coverData;
  const { themeColor, buttonShape } = styleData;

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[361px]">
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
              className="mb-2 w-[350px] h-[360px] object-contain"
            />
          )}
          <CustomButton
            text={startButtonText}
            themeColor={themeColor}
            buttonShape={buttonShape}
          />
        </div>
      </div>
    </div>
  );
}

export default CoverStylePreview;
