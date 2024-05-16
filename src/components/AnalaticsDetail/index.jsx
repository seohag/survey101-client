import useGetSurveyReponses from "../../apis/useGetSurveyReponses";
import Loading from "../shared/Loading";

function AnalyticsDetail() {
  const { surveyResponses, isLoading } = useGetSurveyReponses();

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
                    <td
                      key={`${question._id}-${rowIndex}`}
                      className="px-6 py-4 whitespace-nowrap"
                    >
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
    </aside>
  );
}

export default AnalyticsDetail;
