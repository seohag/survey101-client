import { useState } from "react";
import { useParams } from "react-router-dom";

import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";

import EndingPreview from "../EndingPreview";

import useFormEditorStore from "../../store/useFormEditorStore";
import useUserIdStore from "../../store/useUserIdStore";

import useCreateSurvey from "../../apis/useCreateSurvey";
import usePutSurvey from "../../apis/usePutSurvey";

import SurveyUrlModal from "../shared/SurveyUrlModal";

function EndingEditor() {
  const { userId } = useUserIdStore();
  const { surveyId } = useParams();
  const { coverData, styleData, endingData, questions, setEndingData } =
    useFormEditorStore();
  const [surveyUrl, setSurveyUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const surveyData = {
    creator: userId,
    title: coverData.title,
    subtitle: coverData.subtitle,
    startButtonText: coverData.startButtonText,
    coverImage: coverData.coverImage,
    themeColor: styleData.themeColor,
    buttonShape: styleData.buttonShape,
    animation: styleData.animation,
    endingTitle: endingData.title,
    endingContent: endingData.content,
    questions,
  };

  const createSurvey = useCreateSurvey(surveyData, setSurveyUrl);
  const updateSurvey = usePutSurvey(surveyData, surveyId, setSurveyUrl);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: 1 }, { header: 2 }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block", "emoji"],

        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    },
    "emoji-toolbar": true,
  };

  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
    },
    true,
  );

  function handleSubmit() {
    if (surveyId) {
      updateSurvey();
      setShowModal(true);
    } else {
      createSurvey();
      setShowModal(true);
    }
  }

  return (
    <div className="flex">
      {showModal && (
        <SurveyUrlModal url={surveyUrl} onClose={() => setShowModal(false)} />
      )}
      <section className="w-2/5 p-4">
        <EndingPreview endingData={endingData} styleData={styleData} />
      </section>

      <section className="w-3/5 p-4">
        <div className="text-center">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {surveyId ? "설문 저장" : "설문 생성"}
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center h-[600px]">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-center"
            value={endingData.title}
            readOnly
          />
          <ReactQuill
            theme="snow"
            value={endingData.content}
            onChange={(content) => setEndingData({ ...endingData, content })}
            modules={modules}
            style={{ height: "470px" }}
          />
        </div>
      </section>
    </div>
  );
}

export default EndingEditor;
