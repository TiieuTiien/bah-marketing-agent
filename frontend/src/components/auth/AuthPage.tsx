import { useState } from "react";
import type { AuthFormData, AuthMode } from "../../types/auth";
import { AuthForm } from "./AuthForm";
import "./AuthPage.css";

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: AuthFormData) => {
    setLoading(true);

    try {
      // TODO: Mô phỏng API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Auth data", data);
      console.log("Mode", mode);

      // TODO: Thay bằng API call
      if (mode === "login") {
        alert("Đăng nhập thành công");
      } else {
        alert("Đăng ký thành công!");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>BAH Marketing Agent</h2>
          <p>Quản lý ý tưởng với AI</p>
        </div>

        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onModeChange={setMode}
          loading={loading}
        />
      </div>
    </div>
  );
};
