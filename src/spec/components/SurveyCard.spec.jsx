import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SurveyCard from "../../components/SurveyCard";

vi.mock("../../apis/useDeleteSurvey", () => ({
  default: vi.fn(() => ({
    openModal: vi.fn(),
    modal: null,
  })),
}));

describe("SurveyCard", () => {
  const survey = {
    _id: "survey123",
    title: "Test Survey",
    coverImage: { imageUrl: "/assets/test-coverimg.png" },
  };

  const setOpenDropdownId = vi.fn();

  it("컴포넌트가 올바르게 렌더링되는지 확인", () => {
    render(
      <MemoryRouter>
        <SurveyCard
          survey={survey}
          openDropdownId={null}
          setOpenDropdownId={setOpenDropdownId}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test Survey")).toBeInTheDocument();
    expect(screen.getByAltText("Cover")).toHaveAttribute(
      "src",
      "/assets/test-coverimg.png",
    );
  });
});
