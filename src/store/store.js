import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  user: {},
  setIsLoggedIn: (isLoggedIn) =>
    set({
      isLoggedIn,
    }),
  setUser: (user) => set({ user }),
}));

const logChanges = (state) => console.log("State changed:", state);

const unsubscribe = useUserStore.subscribe(logChanges);
// unsubscribe();

export default useUserStore;
