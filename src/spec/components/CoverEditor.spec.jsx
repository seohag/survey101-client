import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, beforeEach, it, expect } from "vitest";
import CoverEditor from "../../components/CoverEditor";
import useFormEditorStore from "../../store/useFormEditorStore";
import { validateInput } from "../../utils/utils";

vi.mock("../../store/useFormEditorStore");
vi.mock("../../utils/utils");

describe("CoverEditor 컴포넌트", () => {
  beforeEach(() => {
    useFormEditorStore.mockReturnValue({
      coverData: {
        title: "",
        subtitle: "",
        coverImage: null,
        startButtonText: "",
      },
      setCoverData: vi.fn(),
      styleData: {},
    });
  });

  it("CoverEditor 컴포넌트를 렌더링 해야한다.", () => {
    render(<CoverEditor />);
    expect(screen.getByText("설문 커버 편집")).toBeInTheDocument();
  });

  it("제목 Input이 바뀌면 같이 바뀌어야 한다.", () => {
    const { setCoverData } = useFormEditorStore();
    render(<CoverEditor />);
    const titleInput = screen.getByPlaceholderText("제목");

    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(setCoverData).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Title",
      }),
    );
  });

  it("인풋창이 바뀔 때 유효성 검사를 해야한다.", () => {
    validateInput.mockReturnValue("");
    render(<CoverEditor />);
    const titleInput = screen.getByPlaceholderText("제목");

    fireEvent.change(titleInput, { target: { value: "새 제목" } });

    expect(validateInput).toHaveBeenCalledWith("title", "새 제목");
  });

  it("유효성 검사를 통과하지 못하면 에레 메시지를 보여줘야 한다.", () => {
    validateInput.mockReturnValue("유효하지 않은 값입니다.");
    render(<CoverEditor />);
    const titleInput = screen.getByPlaceholderText("제목");

    fireEvent.change(titleInput, { target: { value: "틀린 제목" } });

    expect(screen.getByText("유효하지 않은 값입니다.")).toBeInTheDocument();
  });
});
