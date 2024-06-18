import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import EndingSection from "../../components/EndingSection";
import usePostAnswers from "../../apis/usePostAnswers";
import "@testing-library/jest-dom";

vi.mock("../../apis/usePostAnswers");

const surveyData = {
  endingContent: "<p>설문에 응해주셔서 감사합니다!</p>",
  themeColor: "#ff0000",
  endingTitle: "설문 완료",
};

const surveyAnswers = {
  answer1: "Yes",
  answer2: "No",
};

describe("EndingSection 컴포넌트", () => {
  let fetchAnswers;

  beforeEach(() => {
    fetchAnswers = vi.fn();
    usePostAnswers.mockReturnValue({
      fetchAnswers,
    });
  });

  it("EndingSection 컴포넌트가 올바르게 렌더링 되어야 한다.", () => {
    render(
      <EndingSection surveyData={surveyData} surveyAnswers={surveyAnswers} />,
    );

    const titleElement = screen.getByText(/설문 완료/i);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle({ color: "#ff0000" });

    const contentElement = screen.getByText(/설문에 응해주셔서 감사합니다!/i);
    expect(contentElement).toBeInTheDocument();
  });
});
