import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QuestionControls from "../../components/QuestionControls";

describe("QuestionControls 컴포넌트", () => {
  const handleArrowButtonClick = vi.fn();

  const setup = (props) => render(<QuestionControls {...props} />);

  it("컴포넌트가 렌더링된다", () => {
    setup({ questionId: "q1", handleArrowButtonClick });
    expect(screen.getByLabelText("arrow-up")).toBeInTheDocument();
    expect(screen.getByLabelText("arrow-down")).toBeInTheDocument();
  });

  it("위로 이동 버튼을 클릭하면 handleArrowButtonClick 함수가 호출된다", () => {
    setup({ questionId: "q1", handleArrowButtonClick });
    fireEvent.click(screen.getByLabelText("arrow-up"));
    expect(handleArrowButtonClick).toHaveBeenCalledWith("q1", "up");
  });

  it("아래로 이동 버튼을 클릭하면 handleArrowButtonClick 함수가 호출된다", () => {
    setup({ questionId: "q1", handleArrowButtonClick });
    fireEvent.click(screen.getByLabelText("arrow-down"));
    expect(handleArrowButtonClick).toHaveBeenCalledWith("q1", "down");
  });
});
