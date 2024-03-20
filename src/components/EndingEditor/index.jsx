import ReactQuill, { Quill } from "react-quill";
import quillEmoji from "react-quill-emoji";
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";

import EndingPreview from "../EndingPreview";

function EndingEditor({ endingData, setEndingData, styleData }) {
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

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setEndingData((prevEndingData) => ({
      ...prevEndingData,
      title: newTitle,
    }));
  };

  return (
    <div className="flex">
      <section className="w-2/5 p-4">
        <EndingPreview endingData={endingData} styleData={styleData} />
      </section>

      <section className="w-3/5 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded text-center"
            placeholder="비어있을 때 텍스트를 입력해주세요"
            value={endingData.title}
            onChange={handleTitleChange}
          ></input>
          <ReactQuill
            theme="snow"
            value={endingData.content}
            onChange={(content) => setEndingData({ ...endingData, content })}
            modules={modules}
            style={{ height: "500px" }}
          />
        </div>
        <div className="text-center">
          <button className="bg-gray-300 px-4 py-2 rounded mt-7">
            설문 생성하기
          </button>
        </div>
      </section>
    </div>
  );
}

export default EndingEditor;
