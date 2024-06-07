import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import useFormEditorStore from "../../store/useFormEditorStore";

function EndingPreview() {
  const { endingData, styleData } = useFormEditorStore();

  return (
    <div className="flex flex-col rounded-lg justify-center items-center p-4 bg-gray-200">
      <span className="mb-4 text-center font-bold">미리보기</span>
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center border-4 border-black overflow-auto scrollbar-hide">
        <div className="text-center">
          <div className="p-4 border border-gray-300 rounded min-h-[75vh] max-h-[75vh] min-w-[25vw] max-w-[25vw]">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: styleData.themeColor }}
            >
              {endingData.title || "\b"}
            </h3>
            <ReactQuill
              theme="snow"
              value={endingData.content}
              readOnly
              modules={{
                toolbar: [],
              }}
              className="h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndingPreview;
