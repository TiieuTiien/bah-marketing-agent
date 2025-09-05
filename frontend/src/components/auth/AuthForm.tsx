import { useEffect, useState } from "react";
import type { AuthFormData, AuthMode } from "../../types/auth";
import {
  validateAuthForm,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validation";
import "./auth.css";
import { useDebounce } from "../../hooks/useDebounce";

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormData) => void;
  onModeChange: (mode: AuthMode) => void;
  loading?: boolean;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  onModeChange,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const debouncedFormData = useDebounce(formData, 500);

  useEffect(() => {
    const newFieldErrors: FieldErrors = {};

    if (touched.name && debouncedFormData.name) {
      const nameValidation = validateName(debouncedFormData.name);
      if (!nameValidation.isValid) {
        newFieldErrors.name = nameValidation.errors;
      }
    }

    if (touched.email && debouncedFormData.email) {
      const emailValidation = validateEmail(debouncedFormData.email);
      if (!emailValidation.isValid) {
        newFieldErrors.email = emailValidation.errors;
      }
    }

    if (touched.password && debouncedFormData.password) {
      const passwordValidation = validatePassword(debouncedFormData.password);
      if (!passwordValidation.isValid) {
        newFieldErrors.password = passwordValidation.errors;
      }
    }

    setFieldErrors(newFieldErrors);
  }, [debouncedFormData, touched, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
    });

    const validation = validateAuthForm(formData, mode);

    if (!validation.isValid) {
      setSubmitErrors(validation.errors);
      return;
    }

    setSubmitErrors([]);
    setFieldErrors({});
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (submitErrors.length > 0) {
      setSubmitErrors([]);
    }

    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: undefined,
      });
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
      name: "",
      email: "",
      password: "",
    });
    setFieldErrors({});
    setSubmitErrors([]);
    setTouched({});
    onModeChange(newMode);
  };

  const hasFieldErrors = Object.values(fieldErrors).some(
    (errors) => errors && Array.isArray(errors) && errors.length > 0
  );

  const isFormValid =
    !hasFieldErrors &&
    (mode === "login" || formData.name?.trim() !== "") &&
    formData.email &&
    formData.password;

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</h2>

      {submitErrors.length > 0 && (
        <div className="error-messages">
          {submitErrors.map((error, index) => (
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
              value={formData.name || ""}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={loading}
              className={
                fieldErrors.name && fieldErrors.name.length > 0 ? "error" : ""
              }
            />
            {fieldErrors.name && fieldErrors.name.length > 0 && (
              <div className="field-error">
                {fieldErrors.name.map((error, index) => (
                  <div className="field-error-message" key={index}>
                    {error}
                  </div>
                ))}
              </div>
            )}
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
            className={
              fieldErrors.email && fieldErrors.email.length > 0 ? "error" : ""
            }
          />
          {fieldErrors.email && fieldErrors.email.length > 0 && (
            <div className="field-error">
              {fieldErrors.email.map((error, index) => (
                <div className="field-error-message" key={index}>
                  {error}
                </div>
              ))}
            </div>
          )}
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
            className={
              fieldErrors.password && fieldErrors.password.length > 0
                ? "error"
                : ""
            }
          />
          {fieldErrors.password && fieldErrors.password.length > 0 && (
            <div className="field-error">
              {fieldErrors.password.map((error, index) => (
                <div className="field-error-message" key={index}>
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`submit-btn ${isFormValid ? "valid" : ""}`}
          disabled={loading}
        >
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>
      </form>

      <div className="mode-switch">
        {mode === "login" ? (
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
