import { useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";

import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";

import EndingPreview from "../EndingPreview";
import useFormEditorStore from "../../store/useFormEditorStore";
import useUserIdStore from "../../store/useUserIdStore";
import useSurveyUrlStore from "../../store/useSurveyUrlStore";
import useCreateSurvey from "../../apis/useCreateSurvey";
import usePutSurvey from "../../apis/usePutSurvey";
import SurveyUrlModal from "../shared/SurveyUrlModal";

function EndingEditor() {
  const { userId } = useUserIdStore();
  const { surveyId } = useParams();
  const { coverData, styleData, endingData, setEndingData, questions } =
    useFormEditorStore();
  const { surveyUrl, showModal, setSurveyUrl, setShowModal } =
    useSurveyUrlStore();

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
    <div className="flex flex-col md:flex-row lg:mt-20 md:mt-20 sm:mt-28 xs:mt-28 xxs:mt-20">
      {showModal && (
        <SurveyUrlModal url={surveyUrl} onClose={() => setShowModal(false)} />
      )}
      <section className="w-full md:w-2/5 p-4 hidden md:block">
        <EndingPreview endingData={endingData} styleData={styleData} />
      </section>

      <section className="w-full p-4 max-w-[58%] mx-auto rounded-lg ">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center h-[70vh] border-2">
          <input
            id="endingtitle"
            type="text"
            className="w-full p-2 mt-3 border border-gray-300 rounded text-center"
            value={endingData.title}
            onChange={(ev) =>
              setEndingData({ ...endingData, title: ev.target.value })
            }
          />
          <ReactQuill
            theme="snow"
            value={endingData.content}
            onChange={(content) => setEndingData({ ...endingData, content })}
            modules={modules}
            className="lg:h-[50vh] md:h-[40vh] xr:h-[35vh] xs:h-[29vh]"
          />
        </div>
        <div className="text-center mb-2">
          <button
            className="bg-gray-300 text-[#4E5968] px-4 py-2 rounded-md hover:bg-gray-200"
            onClick={handleSubmit}
          >
            {surveyId ? "설문 저장" : "설문 생성"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default EndingEditor;
