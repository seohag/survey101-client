import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useGetSurveys from "../../apis/useGetSurveys";
import useGoogleLogout from "../../apis/useGoogleLogout";

import SurveyCard from "../../components/SurveyCard";
import SurveyUrlModal from "../../components/shared/SurveyUrlModal";

import useSurveyUrlStore from "../../store/useSurveyUrlStore";
import useGetAuthUser from "../../apis/useGetAuthUser";

function DashBoardPage() {
  useGetAuthUser();
  const { openModal, modal } = useGoogleLogout();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const { surveys } = useGetSurveys();
  const { surveyUrl, showModal, setShowModal } = useSurveyUrlStore();

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const delay = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(delay, wait);
    };
  }

  useEffect(() => {
    const debouncedSearch = debounce(() => {}, 300);

    const timeout = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function toggleSearchVisibility() {
    setIsSearchVisible(!isSearchVisible);
  }

  function filterSurveys(survey) {
    return survey.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const filteredSurveys = surveys.filter(filterSurveys);

  return (
    <>
      {showModal && (
        <SurveyUrlModal url={surveyUrl} onClose={() => setShowModal(false)} />
      )}
      <section className="fixed top-0 left-0 w-full bg-white text-black p-2 border-b border-[[#4E5968]] z-10">
        <div className="flex justify-between items-center flex-wrap">
          <span
            className="flex items-center cursor-pointer ml-2 sm:ml-7"
            onClick={() => navigate("/dash")}
            role="presentation"
          >
            <img
              src="/assets/survey-icon.png"
              alt="Logo"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-lg sm:text-xl font-bold">Survey101</span>
          </span>
          <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
            <button
              className="bg-transparent text-gray-600 px-2 sm:px-4 py-2 mb-2 rounded-md hover:bg-gray-300"
              onClick={() => navigate("/analytics")}
            >
              응답 및 인사이트 보기
            </button>
            <button
              onClick={openModal}
              className="bg-transparent text-gray-600 px-2 sm:px-4 py-2 mb-2 rounded-md hover:bg-gray-300"
            >
              로그아웃
            </button>
          </div>
        </div>
      </section>
      <section className="mt-24 px-5">
        <div className="flex items-center">
          <span className="text-lg sm:text-2xl ml-1 sm:ml-5 mb-2 whitespace-nowrap">
            전체 설문
          </span>
          <button
            type="button"
            aria-label="Survey Card"
            className="text-gray-500 ml-4 sm:ml-4 mb-1"
            onClick={toggleSearchVisibility}
          >
            <FontAwesomeIcon icon={faSearch} className="text-xl mr-2" />
          </button>
          <input
            type="text"
            placeholder="설문의 제목을 입력하세요"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={`border-2 border-gray-300 bg-white h-10 px-4 pr-14 rounded-lg text-sm focus:outline-none overflow-hidden transition-all duration-300 ${
              isSearchVisible
                ? "h-10 opacity-100"
                : "h-0 opacity-0 overflow-hidden"
            }`}
          />
        </div>
      </section>
      <section className="flex items-center justify-center mt-8">
        <button
          className="cursor-pointer bg-transparent p-2 sm:p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-300"
          onClick={() => navigate("/editor/new-form")}
        >
          <span className="text-base sm:text-xl font-semibold">
            설문 생성하기
          </span>
        </button>
      </section>
      <section className="ml-2 mr-2 sm:ml-10 sm:mr-10">
        {filteredSurveys.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {filteredSurveys.map((survey) => (
              <SurveyCard
                key={survey._id}
                survey={survey}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-7 text-gray-500">
            <h2 className="text-2xl font-semibold color">
              작성하신 설문이 없습니다.
            </h2>
          </div>
        )}
      </section>
      {modal}
    </>
  );
}

export default DashBoardPage;
