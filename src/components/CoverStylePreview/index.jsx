import CustomButton from "../CustomButton";
import useFormEditorStore from "../../store/useFormEditorStore";

function CoverStylePreview() {
  const { coverData, styleData } = useFormEditorStore();

  return (
    <div className="flex flex-col rounded-lg justify-center items-center min-h-[85vh] max-h-[85vh] p-4 bg-gray-200">
      <span className="mb-4 text-center font-bold">미리보기</span>
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center border-4 border-black min-h-[75vh] max-w-[25vw]">
        <div className="flex flex-col items-center p-4 w-full h-full">
          <div className="flex flex-col items-center w-full mb-4">
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: styleData.themeColor }}
            >
              {coverData.title}
            </h3>
            <p className="text-sm" style={{ color: styleData.themeColor }}>
              {coverData.subtitle || "\b"}
            </p>
          </div>
          {coverData.coverImage ? (
            <div className="flex-grow flex justify-center items-center mb-4">
              <img
                src={
                  typeof coverData.coverImage.imageUrl === "string"
                    ? coverData.coverImage.imageUrl
                    : URL.createObjectURL(coverData.coverImage)
                }
                alt="Cover"
                className="object-contain w-70 h-80"
              />
            </div>
          ) : (
            <div className="flex-grow flex justify-center items-center mb-4 w-70 h-80 bg-gray-100"></div>
          )}
          <div className="mt-auto w-full flex justify-center">
            <CustomButton
              text={coverData.startButtonText}
              themeColor={styleData.themeColor}
              buttonShape={styleData.buttonShape}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverStylePreview;
