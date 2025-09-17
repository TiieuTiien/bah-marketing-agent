import axios from "axios";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthForm } from "../components/auth/AuthForm";
import type { AuthFormData, AuthMode } from "../types/auth";
import "@/components/auth/auth.css";

export const AuthPage: React.FC = () => {
  const { mode } = useParams<{ mode: AuthMode }>();
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
        navigate("/app/dashboard", { replace: true });
      } else {
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Auth error: ", error.response?.data?.detail);
      }
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: AuthMode) => {
    navigate(`/auth/${newMode}`, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>BAH Marketing Agent</h2>
          <p>Quản lý ý tưởng với AI</p>
        </div>

        <AuthForm
          mode={mode === "register" ? "register" : "login"}
          onSubmit={handleSubmit}
          onModeChange={handleModeChange}
          loading={loading}
        />
      </div>
    </div>
  );
};
