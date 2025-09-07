import { useState } from "react";
import type { AuthFormData, AuthMode } from "../types/auth";
import { AuthForm } from "../components/auth/AuthForm";
import "@/components/auth/auth.css";
import { useNavigate, useParams } from "react-router-dom";

export const AuthPage: React.FC = () => {
  const {mode} = useParams<{mode:AuthMode}>();
  const navigate = useNavigate();

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
        navigate("/app/dashboard", { replace: true });
      } else {
        alert("Đăng ký thành công!");
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: AuthMode) => {
    navigate(`/auth/${newMode}`, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>BAH Marketing Agent</h2>
          <p>Quản lý ý tưởng với AI</p>
        </div>

        <AuthForm
          mode={mode === 'register' ? 'register' : 'login'}
          onSubmit={handleSubmit}
          onModeChange={handleModeChange}
          loading={loading}
        />
      </div>
    </div>
  );
};
