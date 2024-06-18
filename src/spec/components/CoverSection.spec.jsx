import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CoverSection from "../../components/CoverSection";

describe("CoverSection 컴포넌트", () => {
  const mockSurveyData = {
    title: "샘플 제목",
    subtitle: "샘플 부제목",
    coverImage: {
      imageUrl: "https://example.com/sample-image.jpg",
    },
    startButtonText: "설문 시작",
    themeColor: "#3498db",
    buttonShape: "rounded",
  };

  it("설문 데이터를 렌더링 해야한다", () => {
    render(
      <CoverSection
        surveyData={mockSurveyData}
        onStartButtonClick={() => {}}
      />,
    );

    expect(screen.getByText("샘플 제목")).toBeInTheDocument();
    expect(screen.getByText("샘플 부제목")).toBeInTheDocument();

    const coverImage = screen.getByAltText("Cover");
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute(
      "src",
      "https://example.com/sample-image.jpg",
    );

    const button = screen.getByRole("button", { name: "설문 시작" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: "#3498db" });
    expect(button).toHaveClass("rounded");
  });
});
