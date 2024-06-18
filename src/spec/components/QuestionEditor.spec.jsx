import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import QuestionEditor from "../../components/QuestionEditor";

vi.mock("../../components/QuestionPreview", () => ({
  default: vi.fn(({ selectedQuestionId, setSelectedQuestionId }) => (
    <div>
      {selectedQuestionId && (
        <p data-testid="preview-selected-id">{selectedQuestionId}</p>
      )}
      <button
        data-testid="preview-button"
        onClick={() => setSelectedQuestionId("preview-id")}
      >
        미리보기
      </button>
    </div>
  )),
}));

vi.mock("../../components/QuestionList", () => ({
  default: vi.fn(({ setSelectedQuestionId }) => (
    <div>
      <button
        data-testid="list-button"
        onClick={() => setSelectedQuestionId("list-id")}
      >
        질문 리스트
      </button>
    </div>
  )),
}));

describe("QuestionEditor 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("초기 렌더링이 올바르게 수행되는지 확인한다", () => {
    render(<QuestionEditor />);

    expect(screen.queryByTestId("preview-selected-id")).toBeNull();
    expect(screen.getByTestId("list-button")).toBeInTheDocument();
  });
});
