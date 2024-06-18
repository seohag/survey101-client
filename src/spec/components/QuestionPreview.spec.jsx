import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useFormEditorStore from "../../store/useFormEditorStore";
import QuestionPreview from "../../components/QuestionPreview";

const mockQuestions = [
  {
    questionId: "1",
    questionType: "textChoice",
    questionText: "What is your favorite color?",
    options: [
      { optionId: "1", text: "Red" },
      { optionId: "2", text: "Blue" },
    ],
  },
  {
    questionId: "2",
    questionType: "imageChoice",
    questionText: "Choose an image",
    options: [
      { optionId: "1", image: { imageUrl: "image1.jpg" } },
      { optionId: "2", image: { imageUrl: "image2.jpg" } },
    ],
  },
  {
    questionId: "3",
    questionType: "textInput",
    questionText: "Enter your name",
  },
  {
    questionId: "4",
    questionType: "emailInput",
    questionText: "Enter your email",
  },
  {
    questionId: "5",
    questionType: "phoneInput",
    questionText: "Enter your phone number",
  },
  {
    questionId: "6",
    questionType: "numberInput",
    questionText: "Enter your age",
  },
  {
    questionId: "7",
    questionType: "dateInput",
    questionText: "Enter your birthdate",
  },
  {
    questionId: "8",
    questionType: "timeInput",
    questionText: "Enter a time",
  },
  {
    questionId: "9",
    questionType: "radioInput",
    questionText: "Rate our service",
  },
  {
    questionId: "10",
    questionType: "rangeInput",
    questionText: "Select a value",
  },
];

const mockStyleData = {
  themeColor: "blue",
  buttonShape: "rounded",
};

vi.mock("../../store/useFormEditorStore");
useFormEditorStore.mockReturnValue({
  questions: mockQuestions,
  styleData: mockStyleData,
});

describe("QuestionPreview 컴포넌트", () => {
  it("TextChoiceQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="1"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByText("What is your favorite color?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("ImageChoiceQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="2"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(screen.getByText("Choose an image")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("TextInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="3"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("텍스트를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("EmailInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="4"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("이메일을 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("PhoneInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="5"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("전화번호를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("NumberInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="6"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("숫자를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("DateInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="7"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("날짜를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("TimeInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="8"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText("시간을 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("RadioInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="9"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(screen.getByText("Rate our service")).toBeInTheDocument();
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  it("RangeInputQuestion을 올바르게 렌더링", () => {
    render(
      <QuestionPreview
        selectedQuestionId="10"
        setSelectedQuestionId={vi.fn()}
      />,
    );
    expect(screen.getByText("Select a value")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("질문이 선택되지 않았을 때 setSelectedQuestionId를 호출", () => {
    const mockSetSelectedQuestionId = vi.fn();
    render(
      <QuestionPreview
        selectedQuestionId={null}
        setSelectedQuestionId={mockSetSelectedQuestionId}
      />,
    );
    expect(mockSetSelectedQuestionId).toHaveBeenCalledWith("1");
  });
});
