import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddQuestionPopup from "../../components/AddQuestionPopup";

describe("AddQuestionPopup 컴포넌트", () => {
  it("컴포넌트가 렌더링되는지 확인", () => {
    const handleClosePopup = vi.fn();
    const handleAddQuestion = vi.fn();

    render(
      <AddQuestionPopup
        handleClosePopup={handleClosePopup}
        handleAddQuestion={handleAddQuestion}
      />,
    );

    expect(screen.getByText("질문 추가")).toBeInTheDocument();

    expect(screen.getByText("텍스트")).toBeInTheDocument();
    expect(screen.getByText("이미지")).toBeInTheDocument();

    expect(screen.getByText("텍스트 입력")).toBeInTheDocument();
    expect(screen.getByText("이메일 입력")).toBeInTheDocument();
    expect(screen.getByText("전화번호 입력")).toBeInTheDocument();
    expect(screen.getByText("숫자 입력")).toBeInTheDocument();
    expect(screen.getByText("시간 입력")).toBeInTheDocument();
    expect(screen.getByText("날짜 입력")).toBeInTheDocument();
    expect(screen.getByText("슬라이더")).toBeInTheDocument();
    expect(screen.getByText("별점")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 handleClosePopup이 호출되는지 확인", () => {
    const handleClosePopup = vi.fn();
    const handleAddQuestion = vi.fn();

    render(
      <AddQuestionPopup
        handleClosePopup={handleClosePopup}
        handleAddQuestion={handleAddQuestion}
      />,
    );

    fireEvent.click(screen.getByText("닫기"));

    expect(handleClosePopup).toHaveBeenCalled();
  });

  it("각 버튼 클릭 시 handleAddQuestion이 올바른 인자로 호출되는지 확인", () => {
    const handleClosePopup = vi.fn();
    const handleAddQuestion = vi.fn();

    render(
      <AddQuestionPopup
        handleClosePopup={handleClosePopup}
        handleAddQuestion={handleAddQuestion}
      />,
    );

    fireEvent.click(screen.getByText("텍스트"));
    expect(handleAddQuestion).toHaveBeenCalledWith("textChoice");

    fireEvent.click(screen.getByText("이미지"));
    expect(handleAddQuestion).toHaveBeenCalledWith("imageChoice");

    fireEvent.click(screen.getByText("텍스트 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("textInput");

    fireEvent.click(screen.getByText("이메일 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("emailInput");

    fireEvent.click(screen.getByText("전화번호 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("phoneInput");

    fireEvent.click(screen.getByText("숫자 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("numberInput");

    fireEvent.click(screen.getByText("시간 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("timeInput");

    fireEvent.click(screen.getByText("날짜 입력"));
    expect(handleAddQuestion).toHaveBeenCalledWith("dateInput");

    fireEvent.click(screen.getByText("슬라이더"));
    expect(handleAddQuestion).toHaveBeenCalledWith("rangeInput");

    fireEvent.click(screen.getByText("별점"));
    expect(handleAddQuestion).toHaveBeenCalledWith("radioInput");
  });
});
