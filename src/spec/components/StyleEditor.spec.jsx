import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StyleEditor from "../../components/StyleEditor";
import * as useFormEditorStoreModule from "../../store/useFormEditorStore";

describe("StyleEditor 컴포넌트", () => {
  it("정상적으로 렌더링 되는지 확인", () => {
    const mockStore = {
      coverData: {},
      setStyleData: vi.fn(),
      styleData: {
        themeColor: "#000000",
        buttonShape: "rounded-full",
        animation: "fade",
      },
    };

    vi.spyOn(useFormEditorStoreModule, "default").mockReturnValue(mockStore);

    const { getByText, getByLabelText, getByDisplayValue } = render(
      <StyleEditor />,
    );

    expect(getByText("설문 스타일 편집")).toBeInTheDocument();
    expect(getByLabelText("테마 색상")).toBeInTheDocument();
    expect(getByDisplayValue("#000000")).toBeInTheDocument();
    expect(getByLabelText("버튼 모양")).toBeInTheDocument();
    expect(getByDisplayValue("둥근")).toBeInTheDocument();
    expect(getByLabelText("애니메이션")).toBeInTheDocument();
    expect(getByDisplayValue("페이드")).toBeInTheDocument();
  });

  it("테마 색상 변경 시 정상적으로 업데이트 되는지 확인", () => {
    const mockStore = {
      coverData: {},
      setStyleData: vi.fn(),
      styleData: {
        themeColor: "#000000",
        buttonShape: "rounded-full",
        animation: "fade",
      },
    };

    vi.spyOn(useFormEditorStoreModule, "default").mockReturnValue(mockStore);

    const { getByLabelText } = render(<StyleEditor />);
    const colorInput = getByLabelText("테마 색상");

    fireEvent.change(colorInput, { target: { value: "#ffffff" } });

    expect(mockStore.setStyleData).toHaveBeenCalledWith({
      ...mockStore.styleData,
      themeColor: "#ffffff",
    });
  });

  it("버튼 모양 변경 시 정상적으로 업데이트 되는지 확인", () => {
    const mockStore = {
      coverData: {},
      setStyleData: vi.fn(),
      styleData: {
        themeColor: "#000000",
        buttonShape: "rounded-full",
        animation: "fade",
      },
    };

    vi.spyOn(useFormEditorStoreModule, "default").mockReturnValue(mockStore);

    const { getByLabelText } = render(<StyleEditor />);
    const buttonShapeSelect = getByLabelText("버튼 모양");

    fireEvent.change(buttonShapeSelect, { target: { value: "square" } });

    expect(mockStore.setStyleData).toHaveBeenCalledWith({
      ...mockStore.styleData,
      buttonShape: "square",
    });
  });

  it("애니메이션 변경 시 정상적으로 업데이트 되는지 확인", () => {
    const mockStore = {
      coverData: {},
      setStyleData: vi.fn(),
      styleData: {
        themeColor: "#000000",
        buttonShape: "rounded-full",
        animation: "fade",
      },
    };

    vi.spyOn(useFormEditorStoreModule, "default").mockReturnValue(mockStore);

    const { getByLabelText } = render(<StyleEditor />);
    const animationSelect = getByLabelText("애니메이션");

    fireEvent.change(animationSelect, { target: { value: "slide" } });

    expect(mockStore.setStyleData).toHaveBeenCalledWith({
      ...mockStore.styleData,
      animation: "slide",
    });
  });
});
