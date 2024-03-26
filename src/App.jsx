import { Route, Routes } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import ErrorPage from "./pages/ErrorPage";
import DashBoardPage from "./pages/DashBoardPage";
import FormEditorPage from "./pages/FormEditorPage";
import SurveyEditorPage from "./pages/SurveyEditorPage";
import ResponsePage from "./pages/ResponsePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnalyticsDetail from "./components/AnalaticsDetail";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<InitialPage />} />
      <Route path="/dash" element={<DashBoardPage />} />
      <Route path="/analytics" element={<AnalyticsPage />}>
        <Route path=":surveyId" element={<AnalyticsDetail />} />
      </Route>
      <Route path="/editor/new-form" element={<FormEditorPage />} />
      <Route path="/editor/:surveyId" element={<SurveyEditorPage />} />
      <Route path="/form/:surveyId" element={<ResponsePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
