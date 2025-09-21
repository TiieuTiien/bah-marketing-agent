import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MainApp from "../pages/MainApp/MainApp";
import Dashboard from "../components/dashboard/Dashboard";
import Workspace from "../components/workspace/Workspace";
import IdeaList from "../components/idealist/IdeaList";
import DiscussionPanel from "../components/discussion/DiscussionPanel";
import ProtectedRoute from "../routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "workspace", element: <Workspace /> },
          { path: "idealist", element: <IdeaList /> },
          { path: "discussion/:ideaId", element: <DiscussionPanel /> },
          { index: true, element: <Navigate to="/app/dashboard" replace /> },
        ],
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);
