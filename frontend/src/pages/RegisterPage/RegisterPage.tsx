import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/useAuthContext";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

type Props = {};

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = (props: Props) => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };
  return (
    <section className="register-bg">
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-content">
            <h1 className="register-title">Sign up</h1>
            <form
              className="register-form"
              onSubmit={handleSubmit(handleLogin)}
            >
              <div>
                <label htmlFor="email" className="register-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="register-input"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="register-error">{errors.email.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="username" className="register-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="register-input"
                  placeholder="Username"
                  {...register("userName")}
                />
                {errors.userName ? (
                  <p className="register-error">{errors.userName.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="password" className="register-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="register-input"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="register-error">{errors.password.message}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="register-forgot">
                <a href="#" className="register-link">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="register-btn">
                Sign up
              </button>
              <p className="register-signin">
                Already have an account?{" "}
                <span
                  className="register-signin-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
