import { render, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import DropdownMenu from "../../components/DropDownMenu";

describe("DropdownMenu 컴포넌트", () => {
  it("초기 상태에서는 드롭다운 메뉴가 보이지 않아야 한다", () => {
    const { queryByText } = render(
      <DropdownMenu
        handleOptionClick={() => {}}
        isOpen={false}
        toggle={() => {}}
      />,
    );
    expect(queryByText("미리보기")).toBeNull();
  });

  it("드롭다운 버튼을 클릭하면 메뉴가 열려야 한다", () => {
    const toggleMock = vi.fn();
    const { getByLabelText } = render(
      <DropdownMenu
        handleOptionClick={() => {}}
        isOpen={false}
        toggle={toggleMock}
      />,
    );
    const button = getByLabelText("dropdown");
    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalled();
  });

  it("isOpen 속성이 true일 때 드롭다운 메뉴가 보여야 한다", () => {
    const { getByText } = render(
      <DropdownMenu
        handleOptionClick={() => {}}
        isOpen
        toggle={() => {}}
      />,
    );
    expect(getByText("미리보기")).toBeInTheDocument();
    expect(getByText("편집")).toBeInTheDocument();
    expect(getByText("링크 복사")).toBeInTheDocument();
    expect(getByText("응답 데이터 분석")).toBeInTheDocument();
    expect(getByText("삭제")).toBeInTheDocument();
  });

  it("드롭다운 메뉴의 옵션을 클릭하면 handleOptionClick이 호출되어야 한다", () => {
    const handleOptionClickMock = vi.fn();
    const { getByText } = render(
      <DropdownMenu
        handleOptionClick={handleOptionClickMock}
        isOpen
        toggle={() => {}}
      />,
    );
    const option = getByText("미리보기");
    fireEvent.click(option);
    expect(handleOptionClickMock).toHaveBeenCalled();
  });
});
