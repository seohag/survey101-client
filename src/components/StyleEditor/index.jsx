import CoverStylePreview from "../CoverStylePreview";

function StyleEditor({ coverData, styleData, setStyleData }) {
  function handleStyleChange(event) {
    const { name, value } = event.target;

    setStyleData({
      ...styleData,
      [name]: value,
    });
  }
  return (
    <div className="flex">
      <section className="w-2/5 p-4">
        <CoverStylePreview
          coverData={coverData}
          styleData={styleData}
        ></CoverStylePreview>
      </section>

      <section className="w-3/5 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 text-center">
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
                <option value="rounded">둥근</option>
                <option value="square">각진</option>
                <option value="rounded-full">완전 둥근</option>
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
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
              </select>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StyleEditor;
