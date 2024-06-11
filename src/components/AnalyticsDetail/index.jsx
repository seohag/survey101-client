import { useState, useEffect } from "react";
import useGetSurveyReponses from "../../apis/useGetSurveyReponses";
import AnalyticsInsights from "../AnalyticsInsights";

function AnalyticsDetail() {
  const { surveyResponses } = useGetSurveyReponses();
  const [showInsights, setShowInsights] = useState(false);
  const [processedData, setProcessedData] = useState([]);
  const [respondentsCount, setRespondentsCount] = useState(0);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (surveyResponses) {
      const groupedData = surveyResponses.responses.reduce((acc, response) => {
        const { questionText, answerValue, createdAt } = response;

        if (!acc[questionText]) {
          acc[questionText] = [];
        }
        acc[questionText].push({ answerValue, createdAt });

        return acc;
      }, {});

      Object.keys(groupedData).forEach((question) => {
        groupedData[question].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      });

      const sortedQuestions = Object.keys(groupedData);
      const processed = groupedData[sortedQuestions[0]]?.map((_, index) => {
        const row = {
          createdAt: new Date(groupedData[sortedQuestions[0]][index].createdAt),
        };

        sortedQuestions.forEach((question) => {
          row[question] = groupedData[question][index]
            ? groupedData[question][index].answerValue
            : "";
        });

        return row;
      });

      processed?.sort((a, b) => b.createdAt - a.createdAt);
      setProcessedData({ headers: sortedQuestions, rows: processed });

      const maxRespondents = Math.max(
        ...Object.values(groupedData).map((arr) => arr.length),
      );

      setRespondentsCount(maxRespondents);

      const processedChartData = sortedQuestions?.reduce((acc, question) => {
        acc[question] = groupedData[question].map((item) => item.answerValue);

        return acc;
      }, {});

      setChartData(processedChartData);
    }
  }, [surveyResponses]);

  if (!surveyResponses?.responses.length) {
    return (
      <aside className="flex flex-col items-center justify-center w-full h-full lg:mt-36 md:mt-20 sm:mt-28 xs:mt-28 xxs:mt-20">
        <div className="text-center text-gray-400 mb-32">
          응답받은 답변이 없습니다!
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col items-center justify-center w-full h-full overflow-auto xs:ml-7 xxs:ml-7 lg:mt-32 md:mt-32 sm:mt-36 xs:mt-36 xxs:mt-24">
      {showInsights ? (
        <AnalyticsInsights
          processedChartData={chartData}
          onBack={() => setShowInsights(false)}
        />
      ) : (
        <>
          <button
            className="px-4 py-2 mb-7 mt-3 bg-[#374151] text-white rounded hover:bg-black"
            onClick={() => setShowInsights(true)}
          >
            질문별 인사이트
          </button>
          <div className="mb-4">
            <p>설문 응답자 수: {respondentsCount}명</p>
          </div>
          <div className="w-full max-w-screen-lg mx-auto overflow-x-auto mb-32">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                {/* eslint-disable */}
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-2 py-3 text-xs sm:text-sm lg:text-base whitespace-nowrap border border-gray-400 w-1/5">
                      답변 날짜 및 시간
                    </th>
                    {processedData.headers &&
                      processedData.headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-2 py-3 text-xs sm:text-sm lg:text-base whitespace-nowrap border border-gray-400 w-1/5"
                        >
                          {header || "-"}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedData.rows &&
                    processedData.rows?.map((row, rowIndex) => {
                      const date = row.createdAt
                        .toISOString()
                        .slice(0, 10)
                        .replace(/-/g, "-");
                      const time = row.createdAt.toISOString().slice(11, 16);

                      return (
                        <tr key={rowIndex}>
                          <td className="px-2 py-4 text-center text-xs sm:text-sm lg:text-base whitespace-nowrap border border-gray-200">
                            {date} <br /> {time}
                          </td>
                          {processedData.headers.map((header, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-2 py-4 text-center text-xs sm:text-sm lg:text-base whitespace-nowrap border border-gray-200 w-1/5"
                            >
                              {row[header] || "-"}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                </tbody>
                {/* eslint-disable */}
              </table>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

export default AnalyticsDetail;
