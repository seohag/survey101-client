import { useState } from "react";
import { Link } from "react-router-dom";

function SurveyUrlModal({ url, onClose }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      console.error("링크 복사에 실패했습니다.", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">설문 URL</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    해당 링크를 통해 설문을 공유하세요!
                  </p>
                  <div className="flex items-center">
                    <Link
                      style={{ color: "black" }}
                      to={url}
                      className="ml-auto"
                    >
                      {url}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#004CFE] text-base font-medium text-white hover:bg-[#0289FF] focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0"
            >
              닫기
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-black font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0 relative"
            >
              링크 복사
            </button>
            {copySuccess && (
              <span className="text-xs text-green-500 flex lg:items-center md:items-center ml-2 sm:ml-0 sm:mt-0 mt-2">
                복사 완료!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyUrlModal;
