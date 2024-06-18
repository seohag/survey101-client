import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import useFormEditorStore from "../../../store/useFormEditorStore";

describe("useFormEditorStore", () => {
  let store;

  beforeEach(() => {
    act(() => {
      useFormEditorStore.setState({
        activeSection: "cover",
        coverData: {
          title: "설문지",
          subtitle: "",
          startButtonText: "설문 시작하기",
          coverImage: null,
        },
        styleData: {
          themeColor: "#000000",
          buttonShape: "rounded-full",
          animation: "fade",
        },
        endingData: {
          title: "설문 응답이 기록되었습니다",
          content: "결과에 대한 내용을 입력해주세요.",
        },
        questions: [
          {
            questionId: "test-id-1",
            questionType: "textChoice",
            questionText: "",
            options: [{ optionId: "test-option-id-1", text: "" }],
          },
          {
            questionId: "test-id-2",
            questionType: "textInput",
            questionText: "",
          },
          {
            questionId: "test-id-3",
            questionType: "radioInput",
            questionText: "",
          },
        ],
      });
      store = useFormEditorStore.getState();
    });
  });

  it("초기 상태를 확인합니다", () => {
    expect(store.activeSection).toBe("cover");
    expect(store.coverData).toEqual({
      title: "설문지",
      subtitle: "",
      startButtonText: "설문 시작하기",
      coverImage: null,
    });
    expect(store.styleData).toEqual({
      themeColor: "#000000",
      buttonShape: "rounded-full",
      animation: "fade",
    });
    expect(store.endingData).toEqual({
      title: "설문 응답이 기록되었습니다",
      content: "결과에 대한 내용을 입력해주세요.",
    });
    expect(store.questions).toHaveLength(3);
    expect(store.questions[0]).toHaveProperty("questionId");
    expect(store.questions[0].questionType).toBe("textChoice");
    expect(store.questions[1].questionType).toBe("textInput");
    expect(store.questions[2].questionType).toBe("radioInput");
  });

  it("활성 섹션을 설정합니다", () => {
    act(() => {
      store.setActiveSection("style");
    });
    expect(useFormEditorStore.getState().activeSection).toBe("style");
  });

  it("표지 데이터를 업데이트합니다", () => {
    const newCoverData = {
      title: "New Title",
      subtitle: "New Subtitle",
      startButtonText: "Start",
      coverImage: "new_image_url",
    };
    act(() => {
      store.setCoverData(newCoverData);
    });
    expect(useFormEditorStore.getState().coverData).toEqual(newCoverData);
  });

  it("스타일 데이터를 업데이트합니다", () => {
    const newStyleData = {
      themeColor: "#ffffff",
      buttonShape: "square",
      animation: "slide",
    };
    act(() => {
      store.setStyleData(newStyleData);
    });
    expect(useFormEditorStore.getState().styleData).toEqual(newStyleData);
  });

  it("종료 데이터를 업데이트합니다", () => {
    const newEndingData = {
      title: "응답 완료",
      content: "결과를 확인하세요.",
    };
    act(() => {
      store.setEndingData(newEndingData);
    });
    expect(useFormEditorStore.getState().endingData).toEqual(newEndingData);
  });

  it("질문 데이터를 업데이트합니다", () => {
    const newQuestions = [
      {
        questionId: "new-id-1",
        questionType: "textInput",
        questionText: "New Question 1",
      },
      {
        questionId: "new-id-2",
        questionType: "radioInput",
        questionText: "New Question 2",
      },
    ];
    act(() => {
      store.setQuestions(newQuestions);
    });
    expect(useFormEditorStore.getState().questions).toEqual(newQuestions);
  });

  it("초기 상태로 리셋합니다", () => {
    const newCoverData = {
      title: "Changed Title",
      subtitle: "Changed Subtitle",
      startButtonText: "Changed Button",
      coverImage: "changed_image_url",
    };
    act(() => {
      store.setCoverData(newCoverData);
    });
    expect(useFormEditorStore.getState().coverData).toEqual(newCoverData);

    act(() => {
      store.reset();
    });

    expect(useFormEditorStore.getState().coverData).toEqual({
      title: "설문지",
      subtitle: "",
      startButtonText: "설문 시작하기",
      coverImage: null,
    });
  });
});
