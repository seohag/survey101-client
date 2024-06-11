import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import ErrorPage from "./pages/ErrorPage";
import DashBoardPage from "./pages/DashBoardPage";
import FormEditorPage from "./pages/FormEditorPage";
import SurveyEditorPage from "./pages/SurveyEditorPage";
import ResponsePage from "./pages/ResponsePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnalyticsDetail from "./components/AnalyticsDetail";

import AsyncBoundary from "./components/AsyncBoundary";
import Loading from "./components/shared/Loading";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<InitialPage />} />
      <Route
        path="/dash"
        element={
          <AsyncBoundary>
            <DashBoardPage />
          </AsyncBoundary>
        }
      />
      <Route
        path="/analytics"
        element={
          <AsyncBoundary>
            <AnalyticsPage />
          </AsyncBoundary>
        }
      >
        <Route
          path=":surveyId"
          element={
            <AsyncBoundary>
              <AnalyticsDetail />
            </AsyncBoundary>
          }
        />
      </Route>
      <Route
        path="/editor/new-form"
        element={
          <AsyncBoundary>
            <FormEditorPage />
          </AsyncBoundary>
        }
      />
      <Route
        path="/editor/:surveyId"
        element={
          <AsyncBoundary>
            <SurveyEditorPage />
          </AsyncBoundary>
        }
      />
      <Route
        path="/form/:surveyId"
        element={
          <AsyncBoundary>
            <ResponsePage />
          </AsyncBoundary>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
