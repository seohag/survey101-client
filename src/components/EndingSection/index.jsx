import ReactQuill from "react-quill";
import usePostAnswers from "../../apis/usePostAnswers";

import "react-quill/dist/quill.snow.css";
import CustomButton from "../CustomButton";

function EndingSection({ surveyData, surveyAnswers }) {
  const { endingContent, themeColor, endingTitle } = surveyData;
  const { fetchAnswers } = usePostAnswers(surveyAnswers);

  const handlePostAnswers = () => {
    fetchAnswers();
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center">
      <div className="text-center">
        <div className="p-4 border rounded min-h-[550px] min-w-[361px]">
          <h3 className="text-xl font-bold mb-4" style={{ color: themeColor }}>
            {endingTitle}
          </h3>
          <ReactQuill
            theme="snow"
            value={endingContent}
            readOnly
            modules={{
              toolbar: [],
            }}
            style={{ height: "400px" }}
          />
        </div>
        <CustomButton
          themeColor={themeColor}
          onClick={handlePostAnswers}
          text="답변 제출하기"
        />
        <br></br>
        <CustomButton
          themeColor={themeColor}
          onClick={() => window.location.reload()}
          text="다시 시작하기"
        />
      </div>
    </div>
  );
}

export default EndingSection;
