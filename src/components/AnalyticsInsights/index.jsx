import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AnalyticsInsights({ processedChartData, onBack }) {
  const chartData = (question, answers) => {
    const answerCounts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {});

    console.log(answerCounts);

    return {
      labels: Object.keys(answerCounts),
      datasets: [
        {
          data: Object.values(answerCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };
  };

  return (
    <div className="flex flex-col items-center overflow-auto h-full w-full">
      <button
        className="px-4 py-2 mb-7 mt-7 bg-[#374151] text-white rounded hover:bg-black"
        onClick={onBack}
      >
        질문별 테이블
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center w-full px-4">
        {Object.entries(processedChartData).map(([question, answers]) => (
          <div key={question} className="m-4 w-full max-w-xs text-center">
            <h3 className="text-xl font-semibold mb-2">{question}</h3>
            <Pie data={chartData(question, answers)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsInsights;
