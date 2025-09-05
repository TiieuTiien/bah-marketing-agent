import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import MainApp from './pages/MainApp'

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/app/*" element={<MainApp />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
