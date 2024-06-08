import { useState } from "react";

function ConfirmModal({ title, message, confirmText, onClose, onConfirm }) {
  const [userInput, setUserInput] = useState("");

  function handleConfirm() {
    onConfirm(userInput);
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div
        className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center"
        onClick={(ev) => ev.stopPropagation()}
        role="presentation"
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={handleModalClick}
          role="presentation"
        >
          <div className="px-4 pt-5 pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <div className="mt-2">
                  <p>{message}</p>
                  {confirmText === "삭제" && (
                    <input
                      type="text"
                      value={userInput}
                      onChange={(ev) => setUserInput(ev.target.value)}
                      className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t">
            <button
              onClick={handleConfirm}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#004CFE] text-base font-medium text-white hover:bg-[#0289FF] focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mb-2 sm:mb-0"
            >
              확인
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:w-auto sm:text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
