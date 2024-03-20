import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EndingPreview({ endingData, styleData }) {
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[361px]">
          <h3
            className="text-xl font-bold mb-4"
            style={{ color: styleData.themeColor }}
          >
            {endingData.title}
          </h3>
          <ReactQuill
            theme="snow"
            value={endingData.content}
            readOnly
            modules={{
              toolbar: [],
            }}
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default EndingPreview;
