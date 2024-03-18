import CoverStylePreview from "../CoverStylePreview";

function CoverEditor({ coverData, setCoverData, styleData }) {
  function handleCoverChange(event) {
    const { name, value, files } = event.target;

    if (files) {
      setCoverData({
        ...coverData,
        [name]: files[0],
      });
    } else {
      setCoverData({
        ...coverData,
        [name]: value,
      });
    }
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
          <h2 className="text-lg font-bold mb-2">Edit Survey</h2>
          <div className="form-group mb-4">
            <label htmlFor="title" className="block mb-2">
              Title:
              <input
                type="text"
                id="title"
                name="title"
                value={coverData.title}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="subtitle" className="block mb-2">
              Subtitle:
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={coverData.subtitle}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="coverImage" className="block mb-2">
              Cover Image:
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleCoverChange}
                className="w-full border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="startButtonText" className="block mb-2">
              Start Button Text:
              <input
                type="text"
                id="startButtonText"
                name="startButtonText"
                value={coverData.startButtonText}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoverEditor;
