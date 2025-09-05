import { useState } from "react";
import type { AuthFormData, AuthMode } from "../../types/auth";

// Explain about data: AuthFormData
interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormData) => void;
  onModeChange: (mode: AuthMode) => void;
}

// When to export const, when to export default?
export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onModeChange,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</h2>

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="form-group">
            <label htmlFor="name">Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="emaill">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className="submit-btn" type="submit">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>

      <div className="mode-switch">
        {mode === 'login' ? (
            <p>
                Chưa có tài khoản?
                <button onClick={() => onModeChange('register')}>Đăng ký</button>
            </p>
        ) : (
            <p>
                Đã có tài khoản?
                <button onClick={() => onModeChange('login')}>Đăng nhập</button>
            </p>
        )}
      </div>
    </div>
  );
};
