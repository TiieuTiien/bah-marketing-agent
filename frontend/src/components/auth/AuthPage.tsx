import { useState } from "react";
import type { AuthFormData, AuthMode } from "../../types/auth";
import { AuthForm } from "./AuthForm";
import "./AuthPage.css";

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  const handleSubmit = (data: AuthFormData) => {
    // Tạm thời chì log ra console
    console.log("Auth data", data);
    console.log("Mode", mode);

    // TODO: Thay bằng API call
    if (mode === "login") {
      alert("Đăng nhập thành công");
    } else {
      alert("Đăng ký thành công");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>BAH Marketing Agent</h1>
          <p>Quản lý ý tưởng với AI</p>
        </div>

        <AuthForm mode={mode} onSubmit={handleSubmit} onModeChange={setMode} />
      </div>
    </div>
  );
};
