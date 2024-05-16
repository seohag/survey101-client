import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function DropdownMenu({ handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleButtonClick(event) {
    event.stopPropagation();
    toggleMenu();
  }

  function closeMenu(event) {
    if (event.target.closest(".relative")) return;

    setIsOpen(false);
  }

  return (
    <div className="relative text-center">
      <button
        onClick={handleButtonClick}
        className="inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        aria-label="dropdown"
      >
        <FontAwesomeIcon icon={faAngleDown} className="text-xl" />
      </button>
      {isOpen && (
        <div className="absolute ml-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleOptionClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              미리보기
            </button>
            <button
              onClick={handleOptionClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              편집
            </button>
            <button
              onClick={handleOptionClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              링크 복사
            </button>
            <button
              onClick={handleOptionClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              응답 및 분석
            </button>
            <button
              onClick={handleOptionClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;