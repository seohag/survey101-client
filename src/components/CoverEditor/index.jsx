import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import CoverStylePreview from "../CoverStylePreview";

import { validateInput } from "../../utils/utils";
import useFormEditorStore from "../../store/useFormEditorStore";

function CoverEditor() {
  const [errorMessage, setErrorMessage] = useState("");
  const { coverData, setCoverData, styleData } = useFormEditorStore();

  function handleCoverChange(event) {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage("지원되는 이미지 형식은 JPEG 또는 PNG입니다.");
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage("파일 크기는 5MB 이하로 제한됩니다.");
        return;
      }

      setCoverData({
        ...coverData,
        [name]: file,
      });

      setErrorMessage("");
    } else {
      const newValue = value.trim();
      const validateMessage = validateInput(name, newValue);

      if (validateMessage) {
        setErrorMessage(validateMessage);
        return;
      }

      setErrorMessage("");
      setCoverData({
        ...coverData,
        [name]: value,
      });
    }
  }

  return (
    <div className="flex flex-col md:flex-row lg:mt-20 md:mt-20 sm:mt-28 xs:mt-28 xxs:mt-20">
      <section className="md:w-2/5 p-4 hidden md:block">
        <CoverStylePreview
          coverData={coverData}
          styleData={styleData}
        ></CoverStylePreview>
      </section>

      <section className="md:w-full p-4 max-w-full md:max-w-[55%] mx-auto">
        <div className="bg-white border-2 rounded-lg shadow-lg p-4 mb-4 text-center">
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}

          <h2 className="text-lg font-bold mb-2">설문 커버 편집</h2>
          <div className="form-group mb-4">
            <label htmlFor="title" className="block mb-2">
              <input
                type="text"
                id="title"
                name="title"
                value={coverData.title}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded text-center"
                placeholder="제목"
              />
            </label>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="subtitle" className="block mb-2">
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={coverData.subtitle}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded text-center"
                placeholder="부제목(선택)"
              />
            </label>
          </div>

          <label htmlFor="coverImage" className="block mb-2 cursor-pointer">
            <div className="border border-gray-300 rounded flex justify-center items-center h-44">
              {coverData.coverImage ? (
                <img
                  src={
                    typeof coverData.coverImage.imageUrl === "string"
                      ? coverData.coverImage.imageUrl
                      : URL.createObjectURL(coverData.coverImage)
                  }
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-xl" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="coverImage"
              name="coverImage"
              onChange={handleCoverChange}
              className="hidden"
            />
          </label>

          <div className="form-group mb-4">
            <label htmlFor="startButtonText" className="block mb-2">
              <input
                type="text"
                id="startButtonText"
                name="startButtonText"
                value={coverData.startButtonText}
                onChange={handleCoverChange}
                className="w-full p-2 border border-gray-300 rounded text-center"
                placeholder="설문 시작하기 버튼 수정"
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoverEditor;
