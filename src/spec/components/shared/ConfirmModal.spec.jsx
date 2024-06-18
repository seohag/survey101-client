import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ConfirmModal from "../../../components/shared/ConfirmModal";

describe("ConfirmModal 컴포넌트", () => {
  it("제목과 메시지가 올바르게 표시되는지 확인", () => {
    render(
      <ConfirmModal
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    expect(screen.getByText("삭제 확인")).toBeInTheDocument();
    expect(screen.getByText("정말로 삭제하시겠습니까?")).toBeInTheDocument();
  });

  it("삭제 모달에서 입력 필드가 렌더링되는지 확인", () => {
    render(
      <ConfirmModal
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("입력 필드에 값을 입력할 수 있는지 확인", () => {
    render(
      <ConfirmModal
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test Input" } });
    expect(inputElement).toHaveValue("Test Input");
  });

  it("확인 버튼 클릭 시 onConfirm 콜백이 호출되는지 확인", () => {
    const onConfirmMock = vi.fn();
    render(
      <ConfirmModal
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        onClose={vi.fn()}
        onConfirm={onConfirmMock}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Test Input" } });

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledWith("Test Input");
  });

  it("닫기 버튼 클릭 시 onClose 콜백이 호출되는지 확인", () => {
    const onCloseMock = vi.fn();
    render(
      <ConfirmModal
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        onClose={onCloseMock}
        onConfirm={vi.fn()}
      />,
    );

    const closeButton = screen.getByText("닫기");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
