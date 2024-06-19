import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { v4 as uuidv4 } from "uuid";
import QuestionList from "../../components/QuestionList";

vi.mock("../../components/QuestionTitle", () => ({
  default: vi.fn(({ question, handleQuestionTextChange }) => (
    <input
      data-testid={`question-title-${question.questionId}`}
      value={question.questionText}
      onChange={(e) =>
        handleQuestionTextChange(question.questionId, e.target.value)
      }
    />
  )),
}));

vi.mock("../../components/QuestionOptions", () => ({
  default: vi.fn(
    ({
      question,
      handleQuestionOptionChange,
      handleAddTextOption,
      handleDeleteOption,
    }) => (
      <div data-testid={`question-options-${question.questionId}`}>
        {question.options.map((option) => (
          <div key={option.optionId}>
            <input
              data-testid={`option-${option.optionId}`}
              value={option.text}
              onChange={(e) =>
                handleQuestionOptionChange(
                  question.questionId,
                  option.optionId,
                  e.target.value,
                )
              }
            />
            <button
              data-testid={`delete-option-${option.optionId}`}
              onClick={() =>
                handleDeleteOption(question.questionId, option.optionId)
              }
            >
              Delete Option
            </button>
          </div>
        ))}
        <button
          data-testid={`add-text-option-${question.questionId}`}
          onClick={() => handleAddTextOption(question.questionId)}
        >
          Add Option
        </button>
      </div>
    ),
  ),
}));

vi.mock("../../components/QuestionControls", () => ({
  default: vi.fn(() => <div>QuestionControls</div>),
}));

vi.mock("../../components/AddQuestionPopup", () => ({
  default: vi.fn(({ handleAddQuestion }) => (
    <div>
      <button
        data-testid="add-text-choice"
        onClick={() => handleAddQuestion("textChoice")}
      >
        Add Text Choice
      </button>
      <button data-testid="close-popup" onClick={() => {}}>
        Close
      </button>
    </div>
  )),
}));

const mockSetQuestions = vi.fn();
const questionId = uuidv4();
const optionId = uuidv4();
const questionsMock = [
  {
    questionId,
    questionType: "textChoice",
    questionText: "Sample Question",
    options: [{ optionId, text: "Sample Option" }],
  },
];

vi.mock("../../store/useFormEditorStore", () => ({
  default: vi.fn(() => ({
    questions: questionsMock,
    setQuestions: mockSetQuestions,
  })),
}));

describe("QuestionList 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("올바르게 렌더링된다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    expect(screen.getByText("QuestionControls")).toBeInTheDocument();
    expect(screen.getByTestId(`question-title-${questionId}`)).toHaveValue(
      "Sample Question",
    );
    expect(screen.getByTestId(`option-${optionId}`)).toHaveValue(
      "Sample Option",
    );
  });

  it("질문 추가 팝업을 제대로 처리한다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    const button = screen.getByLabelText("Question Button");
    fireEvent.click(button);
    expect(screen.getByTestId("add-text-choice")).toBeInTheDocument();
  });

  it("새로운 텍스트 선택 질문을 추가한다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    const button = screen.getByLabelText("Question Button");
    fireEvent.click(button);
    const addButton = screen.getByTestId("add-text-choice");
    fireEvent.click(addButton);
    expect(mockSetQuestions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          questionType: "textChoice",
        }),
      ]),
    );
  });

  it("텍스트 옵션을 추가한다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    const addButton = screen.getByTestId(`add-text-option-${questionId}`);
    fireEvent.click(addButton);
    expect(mockSetQuestions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          options: expect.arrayContaining([
            expect.objectContaining({
              text: "",
            }),
          ]),
        }),
      ]),
    );
  });

  it("옵션 텍스트를 변경한다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    const optionInput = screen.getByTestId(`option-${optionId}`);
    fireEvent.change(optionInput, { target: { value: "Updated Option" } });
    expect(mockSetQuestions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          options: expect.arrayContaining([
            expect.objectContaining({
              text: "Updated Option",
            }),
          ]),
        }),
      ]),
    );
  });

  it("질문 텍스트를 변경한다", () => {
    render(<QuestionList setSelectedQuestionId={() => {}} />);
    const questionTitleInput = screen.getByTestId(
      `question-title-${questionId}`,
    );
    fireEvent.change(questionTitleInput, {
      target: { value: "Updated Question" },
    });
    expect(mockSetQuestions).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          questionText: "Updated Question",
        }),
      ]),
    );
  });

  it("스크롤 및 리사이즈 이벤트를 처리한다", () => {
    const { container } = render(
      <QuestionList setSelectedQuestionId={() => {}} />,
    );
    const scrollEvent = new Event("scroll");
    const resizeEvent = new Event("resize");

    container.querySelector(".relative").dispatchEvent(scrollEvent);
    window.dispatchEvent(resizeEvent);
  });
});
