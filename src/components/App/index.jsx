import { Route, Routes } from "react-router-dom";
import InitialPage from "../InitialPage";
import ErrorPage from "../ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<InitialPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
