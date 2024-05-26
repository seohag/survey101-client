import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import useGoogleLogOut from "../../apis/useGoogleLogout";
import useGetSurveys from "../../apis/useGetSurveys";

import Loading from "../../components/shared/Loading";
import SurveyCard from "../../components/SurveyCard";
import SurveyUrlModal from "../../components/shared/SurveyUrlModal";

import useUserIdStore from "../../store/useUserIdStore";
import authUser from "../../utils/authUser";

function DashBoardPage() {
  const handleLogOut = useGoogleLogOut();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [surveyUrl, setSurveyUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { surveys, isLoading } = useGetSurveys();
  const { setUser, setIsLoggedIn } = useUserIdStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authUser();
        const { result, user } = response;

        if (result) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser("");
          navigate("/");
        }
      } catch (error) {
        setUser("");
        setIsLoggedIn(false);
        navigate("/");
      }
    };

    checkAuth();
  }, []);

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
    const debouncedSearch = debounce((term) => {}, 300);

    const timeout = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function toggleSearchVisibility() {
    setIsSearchVisible(!isSearchVisible);
  }

  function filterSurveys(survey) {
    return survey.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
  }

  const filteredSurveys = surveys.filter(filterSurveys);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Survey101</span>
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/analytics")}
            >
              응답 인사이트 및 보기
            </button>
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              로그아웃
            </button>
          </div>
        </div>
      </section>
      <section className="relative mt-5">
        <span className="text-2xl ml-5 mb-2">전체 설문</span>
        <button
          type="button"
          aria-label="Survey Card"
          className="text-gray-500 ml-3"
          onClick={toggleSearchVisibility}
        >
          <FontAwesomeIcon icon={faSearch} className="text-xl mr-2" />
        </button>
        <input
          type="text"
          placeholder="설문 검색"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={`border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none overflow-hidden transition-all duration-300 ${
            isSearchVisible
              ? "h-10 opacity-100"
              : "h-0 opacity-0 overflow-hidden"
          }`}
        />
      </section>
      <section className="flex items-center justify-center mt-8">
        <button
          className="cursor-pointer bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          onClick={() => navigate("/editor/new-form")}
        >
          <span className="text-xl font-semibold">설문 생성하기</span>
        </button>
      </section>
      <section>
        {filteredSurveys.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-8">
            {filteredSurveys.map((survey) => (
              <SurveyCard key={survey._id} survey={survey} />
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
    </>
  );
}

export default DashBoardPage;
