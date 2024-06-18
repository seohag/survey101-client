import { render, fireEvent } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import { useParams } from "react-router-dom";
import EndingEditor from "../../components/EndingEditor";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

const mockUseFormEditorStore = {
  coverData: {},
  styleData: {},
  endingData: { title: "", content: "" },
  setEndingData: vi.fn(),
  questions: [],
};

vi.mock("../../store/useFormEditorStore", () => ({
  __esModule: true,
  default: () => mockUseFormEditorStore,
}));

const mockUseUserIdStore = { userId: "user123" };

vi.mock("../../store/useUserIdStore", () => ({
  __esModule: true,
  default: () => mockUseUserIdStore,
}));

const mockUseSurveyUrlStore = {
  surveyUrl: "",
  showModal: false,
  setSurveyUrl: vi.fn(),
  setShowModal: vi.fn(),
};

vi.mock("../../store/useSurveyUrlStore", () => ({
  __esModule: true,
  default: () => mockUseSurveyUrlStore,
}));

const mockUseCreateSurvey = vi.fn();
const mockUsePutSurvey = vi.fn();

vi.mock("../../apis/useCreateSurvey", () => ({
  __esModule: true,
  default: () => mockUseCreateSurvey,
}));

vi.mock("../../apis/usePutSurvey", () => ({
  __esModule: true,
  default: () => mockUsePutSurvey,
}));

describe("EndingEditor 컴포넌트", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useParams.mockReturnValue({ surveyId: null });
  });

  it("설문 생성 버튼을 클릭하면 handleSubmit이 호출되는지 확인한다", () => {
    const { getByText } = render(<EndingEditor />);
    const createButton = getByText("설문 생성");
    fireEvent.click(createButton);
    expect(mockUseCreateSurvey).toHaveBeenCalled();
  });

  it("설문 저장 버튼을 클릭하면 handleSubmit이 호출되는지 확인한다", () => {
    useParams.mockReturnValue({ surveyId: "survey123" });
    const { getByText } = render(<EndingEditor />);
    const saveButton = getByText("설문 저장");
    fireEvent.click(saveButton);
    expect(mockUsePutSurvey).toHaveBeenCalled();
  });
});
