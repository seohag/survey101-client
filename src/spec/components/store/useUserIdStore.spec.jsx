import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import useUserIdStore from "../../../store/useUserIdStore";

describe("useUserIdStore", () => {
  let store;

  beforeEach(() => {
    act(() => {
      store = useUserIdStore.getState();
      store.setIsLoggedIn(false);
      store.setUser({});
      store.setUserId(null);
    });
  });

  it("초기 상태를 확인합니다", () => {
    expect(store.isLoggedIn).toBe(false);
    expect(store.user).toEqual({});
    expect(store.userId).toBeNull();
  });

  it("isLoggedIn을 설정합니다", () => {
    act(() => {
      store.setIsLoggedIn(true);
    });
    expect(useUserIdStore.getState().isLoggedIn).toBe(true);
  });

  it("user를 설정합니다", () => {
    const newUser = { name: "Seoha Geum", email: "seoha@example.com" };
    act(() => {
      store.setUser(newUser);
    });
    expect(useUserIdStore.getState().user).toEqual(newUser);
  });

  it("userId를 설정합니다", () => {
    const newUserId = "123456";
    act(() => {
      store.setUserId(newUserId);
    });
    expect(useUserIdStore.getState().userId).toBe(newUserId);
  });
});
