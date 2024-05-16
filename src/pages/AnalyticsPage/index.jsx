import { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import useGetSurveys from "../../apis/useGetSurveys";
import Loading from "../../components/shared/Loading";

import useGoogleLogOut from "../../apis/useGoogleLogout";

function AnalyticsPage() {
  const { surveyId } = useParams();
  const { surveys, isLoading } = useGetSurveys();
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  const navigate = useNavigate();
  const handleLogOut = useGoogleLogOut();

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
      <header className="w-full bg-green-800 text-white p-4">
        <div className="flex justify-between items-center">
          <span
            className="text-2xl font-bold cursor-pointer"
            onClick={navigateToDash}
            role="presentation"
          >
            Survey101
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={navigateToDash}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              메인페이지로
            </button>
            <button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <section className="flex h-full w-full items-center justify-center">
        <aside className="flex w-1/4 h-full">
          <div className="h-full w-full overflow-y-auto">
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                {surveys.length === 0 ? (
                  <div className="text-center text-gray-400 mt-72">
                    아직 생성된 설문이 없습니다.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {surveys.map((survey) => (
                      <button
                        key={survey._id}
                        onClick={() => showDetail(survey._id)}
                        className="cursor-pointer p-4 border rounded-lg transition duration-300 ease-in-out transform hover:shadow-md"
                        type="button"
                      >
                        <h3 className="text-xl font-semibold">
                          {survey.title}
                        </h3>
                        <p className="text-gray-600">{survey.description}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
        {!selectedSurveyId ? (
          <aside className="flex flex-col items-center justify-start w-full h-full">
            <div className="font-semibold text-xl mb-4 text-gray-700">
              설문을 클릭하여 데이터를 확인하세요!
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-lg p-8">
              <span className="text-gray-700 text-lg">
                왼쪽 리스트에서 설문을 클릭해 데이터를 확인해보세요!
              </span>
            </div>
          </aside>
        ) : (
          <Outlet />
        )}
      </section>
    </main>
  );
}

export default AnalyticsPage;
