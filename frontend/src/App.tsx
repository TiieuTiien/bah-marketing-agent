import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./context/useAuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MainApp from "./pages/MainApp/MainApp";
import Dashboard from "./components/dashboard/Dashboard";
import Workspace from "./components/workspace/Workspace";
import IdeaList from "./components/idealist/IdeaList";
import DiscussionPanel from "./components/discussion/DiscussionPanel";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/app/*" element={<ProtectedRoute><MainApp /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workspace" element={<Workspace />} />
            <Route path="idealist" element={<IdeaList />} />
            <Route path="discussion/:ideaId" element={<DiscussionPanel />} />
            <Route index element={<Navigate to="/app/dashboard" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>{" "}
    </>
  );
}

export default App;
