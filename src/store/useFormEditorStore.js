import { create } from "zustand";

const useFormEditorStore = create((set) => ({
  activeSection: "cover",
  coverData: {
    title: "설문지",
    subtitle: "",
    startButtonText: "설문 시작하기",
    coverImage: null,
  },
  styleData: {
    themeColor: "#000000",
    buttonShape: "rounded",
    animation: "fade",
  },
  endingData: {
    title: "설문 완료",
    content: "결과에 대한 내용을 입력해주세요.",
  },
  questions: [],

  setActiveSection: (section) => set({ activeSection: section }),
  setCoverData: (data) => set({ coverData: { ...data } }),
  setStyleData: (data) => set({ styleData: { ...data } }),
  setEndingData: (data) => set({ endingData: { ...data } }),
  setQuestions: (data) => set({ questions: data }),
  reset: () =>
    set({
      activeSection: "cover",
      coverData: {
        title: "설문지",
        subtitle: "",
        startButtonText: "설문 시작하기",
        coverImage: null,
      },
      styleData: {
        themeColor: "#000000",
        buttonShape: "rounded",
        animation: "fade",
      },
      endingData: {
        title: "설문 완료",
        content: "결과에 대한 내용을 입력해주세요.",
      },
      questions: [],
    }),
}));

export default useFormEditorStore;
