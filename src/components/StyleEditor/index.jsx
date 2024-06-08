import { useState } from "react";
import CoverStylePreview from "../CoverStylePreview";
import useFormEditorStore from "../../store/useFormEditorStore";

function StyleEditor() {
  const { coverData, setStyleData, styleData } = useFormEditorStore();
  const [animationClass, setAnimationClass] = useState("");

  function handleStyleChange(event) {
    const { name, value } = event.target;

    setStyleData({
      ...styleData,
      [name]: value,
    });

    if (name === "animation") {
      setAnimationClass(`animate-${value}-in`);
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <section className="md:w-2/5 p-4 hidden md:block">
        <CoverStylePreview
          coverData={coverData}
          styleData={styleData}
          animationClass={animationClass}
        />
      </section>

      <section className="md:w-full p-4 max-w-[55%] mx-auto">
        <div className="bg-white border-2 rounded-lg shadow-lg p-4 mb-4 text-center">
          <h2 className="text-lg font-bold mb-2">설문 스타일 편집</h2>
          <div className="form-group mb-4">
            <label htmlFor="themeColor" className="block mb-2">
              테마 색상
              <input
                type="color"
                id="themeColor"
                name="themeColor"
                value={styleData.themeColor}
                onChange={(event) =>
                  handleStyleChange({
                    target: { name: "themeColor", value: event.target.value },
                  })
                }
                className="w-full border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="buttonShape" className="block mb-2">
              버튼 모양
              <select
                id="buttonShape"
                name="buttonShape"
                value={styleData.buttonShape}
                onChange={handleStyleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="rounded-full">둥근</option>
                <option value="rounded">부드러운</option>
                <option value="square">각진</option>
              </select>
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="animation" className="block mb-2">
              애니메이션
              <select
                id="animation"
                name="animation"
                value={styleData.animation}
                onChange={handleStyleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="fade">페이드</option>
                <option value="slide">슬라이드</option>
                <option value="zoom">줌</option>
              </select>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StyleEditor;
