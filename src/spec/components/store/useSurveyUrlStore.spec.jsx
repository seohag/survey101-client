import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import useSurveyUrlStore from "../../../store/useSurveyUrlStore";

describe("useSurveyUrlStore", () => {
  let store;

  beforeEach(() => {
    act(() => {
      store = useSurveyUrlStore.getState();
      store.setSurveyUrl("");
      store.setShowModal(false);
    });
  });

  it("초기 상태를 확인합니다", () => {
    expect(store.surveyUrl).toBe("");
    expect(store.showModal).toBe(false);
  });

  it("surveyUrl을 설정합니다", () => {
    const newUrl = "https://example.com/surveyUrl";

    act(() => {
      store.setSurveyUrl(newUrl);
    });
    expect(useSurveyUrlStore.getState().surveyUrl).toBe(newUrl);
  });

  it("showModal을 설정합니다", () => {
    act(() => {
      store.setShowModal(true);
    });
    expect(useSurveyUrlStore.getState().showModal).toBe(true);
  });
});
