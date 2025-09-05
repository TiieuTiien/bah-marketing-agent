import { useState } from "react";
import type { AuthFormData, AuthMode } from "../../types/auth";
import { validateAuthForm } from "../../utils/validation";
import "./AuthPage.css";

// Explain about data: AuthFormData
interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormData) => void;
  onModeChange: (mode: AuthMode) => void;
  loading?: boolean;
}

// When to export const, when to export default?
export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onModeChange,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAuthForm(formData, mode);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleModeChange = (newMode: AuthMode) => {
    setFormData({
      email: "",
      password: "",
      name: "",
    });
    setErrors([]);
    setTouched({});
    onModeChange(newMode);
  };

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</h2>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <div className="error-message" key={index}>
              {error}
            </div>
          ))}
        </div>
      )}

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
              onBlur={handleInputBlur}
              disabled={loading}
              className={touched.name && !formData.name ? "error" : ""}
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
            onBlur={handleInputBlur}
            disabled={loading}
            className={touched.email && !formData.email ? "error" : ""}
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
            onBlur={handleInputBlur}
            disabled={loading}
            className={touched.password && !formData.password ? "error" : ""}
            required
          />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>
      </form>

      <div className="mode-switch">
        {mode === 'login' ? (
          <p>
            Chưa có tài khoản?
            <button
              type="button"
              onClick={() => handleModeChange("register")}
              disabled={loading}
            >
              Đăng ký
            </button>
          </p>
        ) : (
          <p>
            Đã có tài khoản?
            <button
              type="button"
              onClick={() => handleModeChange("login")}
              disabled={loading}
            >
              Đăng nhập
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
