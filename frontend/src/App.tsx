import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ToastContainer } from "react-toastify";
import MainApp from "./pages/MainApp/MainApp";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Workspace from "./components/workspace/Workspace";
import IdeaList from "./components/idealist/IdeaList";
import DiscussionPanel from "./components/discussion/DiscussionPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/:mode" element={<AuthPage />} />
        <Route path="/app/*" element={<MainApp />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="idealist" element={<IdeaList />} />
          <Route path="discussion/:ideaId" element={<DiscussionPanel />} />
          <Route index element={<Navigate to="/app/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
