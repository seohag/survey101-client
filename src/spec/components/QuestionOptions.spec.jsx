import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionOptions from "../../components/QuestionOptions";
import ImageChoiceOption from "../../components/QuestionOptions/ImageChoiceOption";
import ReadOnlyInput from "../../components/QuestionOptions/ReadOnlyInput";

const mockHandlers = {
  handleAddTextOption: vi.fn(),
  handleAddImageOption: vi.fn(),
  handleDeleteOption: vi.fn(),
  handleQuestionOptionChange: vi.fn(),
  handleImageChange: vi.fn(),
  handleOptionOrderChange: vi.fn(),
};

describe("QuestionOptions 컴포넌트", () => {
  const questionTextChoice = {
    questionId: "123",
    questionType: "textChoice",
    questionText: "샘플 질문",
    options: [
      { optionId: "1", text: "옵션 1" },
      { optionId: "2", text: "옵션 2" },
    ],
  };

  const questionImageChoice = {
    questionId: "456",
    questionType: "imageChoice",
    questionText: "이미지 선택 질문",
    options: [
      { optionId: "1", text: "이미지 옵션 1", image: null },
      {
        optionId: "2",
        text: "이미지 옵션 2",
        image: { imageUrl: "https://example.com/image.jpg" },
      },
    ],
  };

  const questionRadioInput = {
    questionId: "789",
    questionType: "radioInput",
    questionText: "라디오 버튼 질문",
    answer: 3,
  };

  it("옵션 추가 버튼이 올바르게 동작합니다 (textChoice)", () => {
    render(<QuestionOptions question={questionTextChoice} {...mockHandlers} />);
    const addButton = screen.getByText("옵션 추가");
    fireEvent.click(addButton);
    expect(mockHandlers.handleAddTextOption).toHaveBeenCalledWith(
      questionTextChoice.questionId,
    );
  });

  it("ImageChoiceOption 컴포넌트가 올바르게 렌더링됩니다", () => {
    render(
      <ImageChoiceOption
        question={questionImageChoice}
        option={questionImageChoice.options[0]}
        handleImageChange={mockHandlers.handleImageChange}
        handleOptionOrderChange={mockHandlers.handleOptionOrderChange}
        handleDeleteOption={mockHandlers.handleDeleteOption}
      />,
    );
  });

  it("ReadOnlyInput 컴포넌트가 올바르게 렌더링됩니다", () => {
    render(<ReadOnlyInput type="number" placeholder="숫자 입력" />);
    const numberInput = screen.getByPlaceholderText("숫자 입력");
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute("type", "number");

    // 범위 입력 타입 테스트
    render(<ReadOnlyInput type="range" />);
    const rangeInput = screen.getByRole("slider");
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute("type", "range");
    expect(rangeInput).toHaveAttribute("style");
  });

  it("라디오 버튼이 올바르게 렌더링되고 체크 상태가 정확히 표시됩니다 (radioInput)", () => {
    render(<QuestionOptions question={questionRadioInput} {...mockHandlers} />);
    const starIcons = screen.getAllByText("★");
    expect(starIcons[2]).toHaveClass("text-yellow-500"); // Assuming answer is 3, which corresponds to the third star
  });
});
