import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuestionSection from "../../components/QuestionSection";

const mockSurveyData = {
  themeColor: "#000000",
  buttonShape: "rounded",
  animation: "fade",
  questions: [
    {
      questionId: "q1",
      questionText: "텍스트 선택 질문",
      questionType: "textChoice",
      options: [
        { optionId: "o1", text: "옵션 1" },
        { optionId: "o2", text: "옵션 2" },
      ],
    },
    {
      questionId: "q2",
      questionText: "텍스트 입력 질문",
      questionType: "textInput",
    },
    {
      questionId: "q3",
      questionText: "이미지 선택 질문",
      questionType: "imageChoice",
      options: [
        {
          optionId: "o3",
          image: { imageUrl: "https://via.placeholder.com/150" },
        },
        {
          optionId: "o4",
          image: { imageUrl: "https://via.placeholder.com/150" },
        },
      ],
    },
    {
      questionId: "q4",
      questionText: "날짜 입력 질문",
      questionType: "dateInput",
    },
    {
      questionId: "q5",
      questionText: "시간 입력 질문",
      questionType: "timeInput",
    },
    {
      questionId: "q6",
      questionText: "범위 입력 질문",
      questionType: "rangeInput",
    },
  ],
};

const mockSurveyAnswers = {};
const mockSetSurveyAnswers = vi.fn();

describe("QuestionSection 컴포넌트", () => {
  beforeEach(() => {
    mockSetSurveyAnswers.mockClear();
  });

  it("정상적으로 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    expect(screen.getByText("텍스트 선택 질문")).toBeInTheDocument();
  });

  it("텍스트 선택 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    expect(screen.getByText("옵션 1")).toBeInTheDocument();
    expect(screen.getByText("옵션 2")).toBeInTheDocument();
  });

  it("텍스트 입력 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));

    expect(
      screen.getByPlaceholderText("텍스트를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("이미지 선택 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));
    fireEvent.change(screen.getByPlaceholderText("텍스트를 입력해주세요"), {
      target: { value: "Test Input" },
    });
    fireEvent.click(screen.getByText("다음"));

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute("src", "https://via.placeholder.com/150");
    expect(images[1]).toHaveAttribute("src", "https://via.placeholder.com/150");
  });

  it("날짜 입력 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));
    fireEvent.change(screen.getByPlaceholderText("텍스트를 입력해주세요"), {
      target: { value: "Test Input" },
    });
    fireEvent.click(screen.getByText("다음"));
    fireEvent.click(screen.getByAltText("o3"));

    expect(
      screen.getByPlaceholderText("날짜를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("시간 입력 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));
    fireEvent.change(screen.getByPlaceholderText("텍스트를 입력해주세요"), {
      target: { value: "Test Input" },
    });
    fireEvent.click(screen.getByText("다음"));
    fireEvent.click(screen.getByAltText("o3"));
    fireEvent.change(screen.getByPlaceholderText("날짜를 입력해주세요"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.click(screen.getByText("다음"));

    expect(
      screen.getByPlaceholderText("시간을 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("범위 입력 질문이 올바르게 렌더링 되는지 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));
    fireEvent.change(screen.getByPlaceholderText("텍스트를 입력해주세요"), {
      target: { value: "Test Input" },
    });
    fireEvent.click(screen.getByText("다음"));
    fireEvent.click(screen.getByAltText("o3"));
    fireEvent.change(screen.getByPlaceholderText("날짜를 입력해주세요"), {
      target: { value: "2023-01-01" },
    });
    fireEvent.click(screen.getByText("다음"));
    fireEvent.change(screen.getByPlaceholderText("시간을 입력해주세요"), {
      target: { value: "12:00" },
    });
    fireEvent.click(screen.getByText("다음"));

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("이전 질문 버튼 동작 확인", () => {
    render(
      <QuestionSection
        surveyData={mockSurveyData}
        surveyAnswers={mockSurveyAnswers}
        setSurveyAnswers={mockSetSurveyAnswers}
      />,
    );

    fireEvent.click(screen.getByText("옵션 1"));
    fireEvent.click(screen.getByLabelText("Question Prev Button"));

    expect(screen.getByText("텍스트 선택 질문")).toBeInTheDocument();
  });
});
