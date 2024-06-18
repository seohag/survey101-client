import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  BrowserRouter,
  useNavigate as useNavigateActual,
  useParams as useParamsActual,
} from "react-router-dom";
import FormEditorHeader from "../../components/Header";
import useUserIdStore from "../../store/useUserIdStore";
import useFormEditorStore from "../../store/useFormEditorStore";
import usePutSurvey from "../../apis/usePutSurvey";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
    useParams: vi.fn(),
  };
});

vi.mock("../../store/useUserIdStore", () => ({
  default: vi.fn(),
}));

vi.mock("../../store/useFormEditorStore", () => ({
  default: vi.fn(),
}));

vi.mock("../../apis/usePutSurvey", () => ({
  default: vi.fn(),
}));

describe("FormEditorHeader 컴포넌트", () => {
  const mockNavigate = vi.fn();
  const mockUseParams = { surveyId: "123" };
  const mockUserIdStore = { userId: "456" };
  const mockFormEditorStore = {
    coverData: {
      title: "Title",
      subtitle: "Subtitle",
      startButtonText: "Start",
      coverImage: "cover.jpg",
    },
    styleData: {
      themeColor: "#000000",
      buttonShape: "round",
      animation: "fade",
    },
    endingData: { title: "End Title", content: "End Content" },
    questions: [{ id: "q1", question: "Sample Question?" }],
  };
  const mockUsePutSurvey = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigateActual).mockReturnValue(mockNavigate);
    vi.mocked(useParamsActual).mockReturnValue(mockUseParams);
    vi.mocked(useUserIdStore).mockReturnValue(mockUserIdStore);
    vi.mocked(useFormEditorStore).mockReturnValue(mockFormEditorStore);
    vi.mocked(usePutSurvey).mockReturnValue(mockUsePutSurvey);
  });

  const setup = (props) => render(
      <BrowserRouter>
        <FormEditorHeader {...props} />
      </BrowserRouter>,
    );

  it("컴포넌트가 렌더링된다", () => {
    setup({
      activeSection: "cover",
      onSectionChange: vi.fn(),
      isNewForm: false,
    });
    expect(screen.getByText("Survey101")).toBeInTheDocument();
  });

  it("저장 버튼을 클릭하면 handleSubmit 함수가 호출된다", () => {
    setup({
      activeSection: "cover",
      onSectionChange: vi.fn(),
      isNewForm: false,
    });
    const saveButtons = screen.getAllByRole("button", { name: /save-button/i });
    const saveButton = saveButtons.find(
      (button) => button.getAttribute("aria-label") === "save-button",
    );
    fireEvent.click(saveButton);
    expect(mockUsePutSurvey).toHaveBeenCalled();
  });

  it("섹션 버튼 클릭 시 onSectionChange 함수가 호출된다", () => {
    const onSectionChange = vi.fn();
    setup({ activeSection: "cover", onSectionChange, isNewForm: false });

    fireEvent.click(screen.getByText("설문 커버"));
    expect(onSectionChange).toHaveBeenCalledWith("cover");

    fireEvent.click(screen.getByText("설문 스타일"));
    expect(onSectionChange).toHaveBeenCalledWith("style");

    fireEvent.click(screen.getByText("설문 내용"));
    expect(onSectionChange).toHaveBeenCalledWith("question");

    fireEvent.click(screen.getByText("설문 마무리"));
    expect(onSectionChange).toHaveBeenCalledWith("ending");
  });

  it("새 설문일 경우 저장 버튼이 렌더링되지 않는다", () => {
    setup({
      activeSection: "cover",
      onSectionChange: vi.fn(),
      isNewForm: true,
    });
    expect(
      screen.queryByRole("button", { name: /save-button/i }),
    ).not.toBeInTheDocument();
  });

  it("Survey101 로고 클릭 시 대시보드로 이동한다", () => {
    setup({
      activeSection: "cover",
      onSectionChange: vi.fn(),
      isNewForm: false,
    });
    fireEvent.click(screen.getByText("Survey101"));
    expect(mockNavigate).toHaveBeenCalledWith("/dash");
  });
});
