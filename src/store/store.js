import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserIdStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: {},
      userId: null,
      setIsLoggedIn: (isLoggedIn) =>
        set({
          isLoggedIn,
        }),
      setUser: (user) => set({ user }),
      setUserId: (userId) => set(() => ({ userId })),
    }),
    {
      name: "userIdStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserIdStore;
