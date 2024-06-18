import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AnalyticsDetail from "../../components/AnalyticsDetail";
import useGetSurveyReponses from "../../apis/useGetSurveyReponses";

vi.mock("../../apis/useGetSurveyReponses");

describe("AnalyticsDetail 컴포넌트", () => {
  it("응답이 없을 때 올바른 메시지를 표시하는지 확인", () => {
    useGetSurveyReponses.mockReturnValue({
      surveyResponses: { responses: [] },
    });

    render(<AnalyticsDetail />);

    expect(screen.getByText("응답받은 답변이 없습니다!")).toBeInTheDocument();
  });

  it("응답이 있을 때 테이블과 응답자 수를 올바르게 표시하는지 확인", () => {
    useGetSurveyReponses.mockReturnValue({
      surveyResponses: {
        responses: [
          {
            questionText: "Question 1",
            answerValue: "Answer 1",
            createdAt: "2023-01-01T12:00:00Z",
          },
          {
            questionText: "Question 2",
            answerValue: "Answer 2",
            createdAt: "2023-01-02T13:00:00Z",
          },
        ],
      },
    });

    render(<AnalyticsDetail />);

    expect(screen.getByText("Question 1")).toBeInTheDocument();
    expect(screen.getByText("Question 2")).toBeInTheDocument();
    expect(screen.getByText("Answer 1")).toBeInTheDocument();
    expect(screen.getByText("Answer 2")).toBeInTheDocument();
  });

  it("질문별 인사이트 버튼 클릭 시 AnalyticsInsights 컴포넌트로 전환되는지 확인", () => {
    useGetSurveyReponses.mockReturnValue({
      surveyResponses: {
        responses: [
          {
            questionText: "Question 1",
            answerValue: "Answer 1",
            createdAt: "2023-01-01T12:00:00Z",
          },
        ],
      },
    });

    render(<AnalyticsDetail />);

    fireEvent.click(screen.getByText("질문별 인사이트"));
    expect(screen.getByText("질문별 테이블")).toBeInTheDocument();
  });
});
