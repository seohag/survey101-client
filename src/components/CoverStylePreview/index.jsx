import CustomButton from "../CustomButton";
import useFormEditorStore from "../../store/useFormEditorStore";

function CoverStylePreview() {
  const { coverData, styleData } = useFormEditorStore();

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[361px]">
          <h3
            className="text-xl font-bold mb-4"
            style={{ color: styleData.themeColor }}
          >
            {coverData.title}
          </h3>
          <p className="text-sm mb-6" style={{ color: styleData.themeColor }}>
            {coverData.subtitle}
          </p>
          {coverData.coverImage && (
            <img
              src={
                typeof coverData.coverImage.imageUrl === "string"
                  ? coverData.coverImage.imageUrl
                  : URL.createObjectURL(coverData.coverImage)
              }
              alt="Cover"
              className="mb-2 w-[350px] h-[360px] object-contain"
            />
          )}
          <CustomButton
            text={coverData.startButtonText}
            themeColor={styleData.themeColor}
            buttonShape={styleData.buttonShape}
          />
        </div>
      </div>
    </div>
  );
}

export default CoverStylePreview;
