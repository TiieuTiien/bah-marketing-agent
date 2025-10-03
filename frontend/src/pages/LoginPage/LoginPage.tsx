import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuthContext";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

type LoginFormsInputs = {
  username: string;
  password: string;
};

const validation = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.username, form.password);
  };
  return (
    <section className="login-bg">
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-content">
            <h1 className="login-title">Sign in</h1>
            <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label htmlFor="username" className="login-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="login-input"
                  placeholder="Username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="login-error">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="login-input"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="login-error">{errors.password.message}</p>
                )}
              </div>
              <div className="login-forgot">
                <a href="#" className="login-link">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="login-btn">
                Sign in
              </button>
              <p className="login-signup">
                Don’t have an account yet?{" "}
                <span
                  className="login-signup-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
