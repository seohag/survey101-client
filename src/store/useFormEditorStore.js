import { create } from "zustand";

import { v4 as uuidv4 } from "uuid";

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
    buttonShape: "rounded-full",
    animation: "fade",
  },
  endingData: {
    title: "설문 응답이 기록되었습니다",
    content: "결과에 대한 내용을 입력해주세요.",
  },
  questions: [
    {
      questionId: uuidv4(),
      questionType: "textChoice",
      questionText: "",
      options: [{ optionId: uuidv4(), text: "" }],
    },
    {
      questionId: uuidv4(),
      questionType: "textInput",
      questionText: "",
    },
    {
      questionId: uuidv4(),
      questionType: "radioInput",
      questionText: "",
    },
  ],

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
        buttonShape: "rounded-full",
        animation: "fade",
      },
      endingData: {
        title: "설문 응답이 기록되었습니다",
        content: "결과에 대한 내용을 입력해주세요.",
      },
      questions: [
        {
          questionId: uuidv4(),
          questionType: "textChoice",
          questionText: "",
          options: [{ optionId: uuidv4(), text: "" }],
        },
        {
          questionId: uuidv4(),
          questionType: "textInput",
          questionText: "",
        },
        {
          questionId: uuidv4(),
          questionType: "radioInput",
          questionText: "",
        },
      ],
    }),
}));

export default useFormEditorStore;
