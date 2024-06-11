import { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import useGetSurveys from "../../apis/useGetSurveys";
import useGoogleLogout from "../../apis/useGoogleLogout";

function AnalyticsPage() {
  const { surveyId } = useParams();
  const { surveys } = useGetSurveys();
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const navigate = useNavigate();
  const { openModal, modal } = useGoogleLogout();

  useEffect(() => {
    if (surveyId) {
      setSelectedSurveyId(surveyId);
    }
  }, [surveyId]);

  function navigateToDash() {
    navigate("/dash");
  }

  function showDetail(clickedSurveyId) {
    setSelectedSurveyId(clickedSurveyId);
    navigate(`/analytics/${clickedSurveyId}`);
  }

  return (
    <main className="h-screen w-screen box-border">
      <header className="bg-[#495667] text-white p-2 border-b fixed top-0 left-0 w-full z-10">
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
              onClick={navigateToDash}
              className="bg-transparent text-white px-4 py-2 mb-2 rounded-md hover:bg-[#8B9093]"
            >
              <span className="whitespace-nowrap">메인페이지로</span>
            </button>
            <button
              onClick={openModal}
              className="bg-transparent text-white px-4 py-2 mb-2 rounded-md hover:bg-[#8B9093]"
            >
              <span className="whitespace-nowrap">로그아웃</span>
            </button>
          </div>
        </div>
      </header>
      <section className="flex h-full w-full items-center justify-center">
        <aside className="flex w-1/4 h-full">
          <div className="h-full w-full overflow-y-auto">
            <div>
              {surveys.length === 0 ? (
                <div className="text-center text-gray-400 mt-72">
                  아직 생성된 설문이 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:mt-20 xxs:mt-20 xs:mt-20">
                  {surveys.map((survey) => (
                    <button
                      key={survey._id}
                      onClick={() => showDetail(survey._id)}
                      className={`group transition-all duration-300 bg-white rounded-md border-2 p-4 hover:shadow-lg hover:border-[#3182F6] hover:shadow-outline ${
                        selectedSurveyId === survey._id
                          ? "border-[#3182F6] shadow-lg"
                          : "border-gray-200"
                      }`}
                      type="button"
                    >
                      <h3 className="text-center md:text-xl sm:text-xs xs:text-xs font-semibold overflow-hidden text-overflow-ellipsis">
                        {survey.title}
                      </h3>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
        {!selectedSurveyId ? (
          <aside className="flex flex-col items-center justify-start w-full h-full">
            <div className="font-semibold mb-4 text-gray-700 md:text-xl sm:text-sm">
              설문을 클릭하여 데이터를 확인하세요!
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-lg p-8 ">
              <span className="text-gray-700 md:text-xl sm:text-sm ">
                왼쪽 리스트에서 설문을 클릭해 데이터를 확인해보세요!
              </span>
            </div>
          </aside>
        ) : (
          <Outlet />
        )}
      </section>
      {modal}
    </main>
  );
}

export default AnalyticsPage;
