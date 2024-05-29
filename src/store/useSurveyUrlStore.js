import { create } from "zustand";

const useSurveyUrlStore = create((set) => ({
  surveyUrl: "",
  showModal: false,
  setSurveyUrl: (url) => set({ surveyUrl: url }),
  setShowModal: (show) => set({ showModal: show }),
}));

export default useSurveyUrlStore;
