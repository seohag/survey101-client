import ReactQuill from "react-quill";
import usePostAnswers from "../../apis/usePostAnswers";

import "react-quill/dist/quill.snow.css";
import ResponseCustomButton from "../ResponseCustomButton";

function EndingSection({ surveyData, surveyAnswers }) {
  const { endingContent, themeColor, endingTitle } = surveyData;
  const { fetchAnswers } = usePostAnswers(surveyAnswers);

  const handlePostAnswers = () => {
    fetchAnswers();
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="text-center">
        <div className="p-4 border rounded min-h-[40vh]">
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
            className="h-[300px]"
          />
        </div>
        <br></br>
        <br></br>
        <ResponseCustomButton
          themeColor={themeColor}
          onClick={handlePostAnswers}
          text="답변 제출하기"
        />
        <br></br>
        <ResponseCustomButton
          themeColor={themeColor}
          onClick={() => window.location.reload()}
          text="다시 시작하기"
        />
      </div>
    </div>
  );
}

export default EndingSection;
