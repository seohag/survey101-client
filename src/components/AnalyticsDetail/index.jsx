import { useState, useEffect } from "react";
import useGetSurveyReponses from "../../apis/useGetSurveyReponses";
import Loading from "../shared/Loading";

function AnalyticsDetail() {
  const { surveyResponses, isLoading } = useGetSurveyReponses();
  const [showInsights, setShowInsights] = useState(false);
  const [respondentsCount, setRespondentsCount] = useState(0);

  useEffect(() => {
    if (!isLoading && surveyResponses.responses.length > 0) {
      const totalCount = Math.max(
        ...Object.values(processData(surveyResponses.responses)).map(
          (arr) => arr.length,
        ),
      );
      setRespondentsCount(totalCount);
    }
  }, [surveyResponses, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  function processData(surveyAnswers) {
    const groupedData = {};

    surveyAnswers.forEach((item) => {
      const { questionText, answerValue } = item;

      if (groupedData.hasOwnProperty.call(groupedData, questionText)) {
        groupedData[questionText].push(answerValue);
      } else {
        groupedData[questionText] = [answerValue];
      }
    });

    return groupedData;
  }

  const processedSurveyResponses = processData(surveyResponses.responses);

  if (surveyResponses.responses.length === 0) {
    return (
      <aside className="flex flex-col items-center justify-center w-full h-full">
        <div className="text-center text-gray-400 mb-32">
          응답받은 답변이 없습니다!
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col items-center justify-center w-full h-full">
      <div className="mb-4">
        <p>설문 응답자 수: {respondentsCount}명</p>
      </div>
      <div className="w-full max-w-screen-lg mx-auto overflow-x-auto mb-32">
        <table className="min-h-1/4 bg-green-500 w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr>
              {Object.keys(processedSurveyResponses).map((questionText) => (
                <th key={questionText} className="px-6 py-3 whitespace-nowrap">
                  {questionText}
                </th>
              ))}
            </tr>
          </thead>
          {/* eslint-disable */}
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({
              length: Math.max(
                ...Object.values(processedSurveyResponses).map(
                  (arr) => arr.length,
                ),
              ),
            }).map((_, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {Object.entries(processedSurveyResponses).map(
                  ([question, answers]) => (
                    <td key={question} className="px-6 py-4 whitespace-nowrap">
                      {answers[rowIndex] || "-"}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
          {/* eslint-disable */}
        </table>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setShowInsights(true)}
      >
        질문별 인사이트
      </button>
    </aside>
  );
}

export default AnalyticsDetail;
