import { Route, Routes } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import ErrorPage from "./pages/ErrorPage";
import DashBoardPage from "./pages/DashBoardPage";
import FormEditorPage from "./pages/FormEditorPage";
import SurveyEditorPage from "./pages/SurveyEditorPage";
import ResponsePage from "./pages/ResponsePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnalyticsDetail from "./components/AnalyticsDetail";

import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<InitialPage />} />
      <Route
        path="/dash"
        element={
          <ErrorBoundary>
            <DashBoardPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/analytics"
        element={
          <ErrorBoundary>
            <AnalyticsPage />
          </ErrorBoundary>
        }
      >
        <Route
          path=":surveyId"
          element={
            <ErrorBoundary>
              <AnalyticsDetail />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route
        path="/editor/new-form"
        element={
          <ErrorBoundary>
            <FormEditorPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/editor/:surveyId"
        element={
          <ErrorBoundary>
            <SurveyEditorPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/form/:surveyId"
        element={
          <ErrorBoundary>
            <ResponsePage />
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
