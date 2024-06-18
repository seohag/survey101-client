import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import CoverStylePreview from "../../components/CoverStylePreview";
import useFormEditorStore from "../../store/useFormEditorStore";
import { getBrightness } from "../../utils/utils";

vi.mock("../../store/useFormEditorStore", () => ({
    default: vi.fn(),
  }));

vi.mock("../../utils/utils", () => ({
  getBrightness: vi.fn(),
}));

vi.mock("../../components/CustomButton", () => ({
    default: ({ text, themeColor, buttonShape }) => (
      <button
        style={{
          backgroundColor: themeColor,
          borderRadius: buttonShape === "rounded" ? "50%" : "0%",
        }}
      >
        {text}
      </button>
    ),
  }));

describe("CoverStylePreview 컴포넌트", () => {
  const coverData = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    coverImage: {
      imageUrl: "https://example.com/image.jpg",
    },
    startButtonText: "Start",
  };

  const styleData = {
    themeColor: "blue",
    buttonShape: "rounded",
  };

  useFormEditorStore.mockReturnValue({
    coverData,
    styleData,
  });

  it("커버 데이터를 올바르게 렌더링 해야한다", () => {
    getBrightness.mockReturnValue(100);

    const { getByText, getByAltText } = render(
      <CoverStylePreview animationClass="fade-in" />,
    );

    expect(getByText("미리보기")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Subtitle")).toBeInTheDocument();
    expect(getByAltText("Cover")).toBeInTheDocument();
    expect(getByText("Start")).toBeInTheDocument();
  });

  it("커버 이미지가 없다면 아무것도 렌더하지 말아야한다.", () => {
    getBrightness.mockReturnValue(100);

    useFormEditorStore.mockReturnValueOnce({
      coverData: { ...coverData, coverImage: null },
      styleData,
    });

    const { getByText, queryByAltText } = render(
      <CoverStylePreview animationClass="fade-in" />,
    );

    expect(getByText("미리보기")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Subtitle")).toBeInTheDocument();
    expect(queryByAltText("Cover")).not.toBeInTheDocument();
  });
});
