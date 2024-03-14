import { Route, Routes } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import ErrorPage from "./pages/ErrorPage";
import DashBoardPage from "./pages/DashBoardPage";
import SurveyEditorPage from "./pages/SurveyEditorPage";

import useGetAuthUser from "./apis/useGetAuthUser";

function App() {
  useGetAuthUser();

  return (
    <Routes>
      <Route path="/" exact element={<InitialPage />} />
      <Route path="/dash" element={<DashBoardPage />} />
      <Route path="/editor" element={<SurveyEditorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
