import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { validateAuthForm, validateEmail, validateName, validatePassword, } from "../../utils/validation";
import "./auth.css";
import { useDebounce } from "../../hooks/useDebounce";
export const AuthForm = ({ mode, onSubmit, onModeChange, loading = false, }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitErrors, setSubmitErrors] = useState([]);
    const debouncedFormData = useDebounce(formData, 500);
    useEffect(() => {
        const newFieldErrors = {};
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
    const handleSubmit = (e) => {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (submitErrors.length > 0) {
            setSubmitErrors([]);
        }
        if (fieldErrors[name]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: undefined,
            });
        }
    };
    const handleInputBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });
    };
    const handleModeChange = (newMode) => {
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
    const hasFieldErrors = Object.values(fieldErrors).some((errors) => errors && Array.isArray(errors) && errors.length > 0);
    const isFormValid = !hasFieldErrors &&
        (mode === "login" || formData.name?.trim() !== "") &&
        formData.email &&
        formData.password;
    return (_jsxs("div", { className: "auth-form", children: [_jsx("h2", { children: mode === "login" ? "Đăng nhập" : "Đăng ký" }), submitErrors.length > 0 && (_jsx("div", { className: "error-messages", children: submitErrors.map((error, index) => (_jsx("div", { className: "error-message", children: error }, index))) })), _jsxs("form", { onSubmit: handleSubmit, children: [mode === "register" && (_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "T\u00EAn:" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name || "", onChange: handleInputChange, onBlur: handleInputBlur, disabled: loading, className: fieldErrors.name && fieldErrors.name.length > 0 ? "error" : "" }), fieldErrors.name && fieldErrors.name.length > 0 && (_jsx("div", { className: "field-error", children: fieldErrors.name.map((error, index) => (_jsx("div", { className: "field-error-message", children: error }, index))) }))] })), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "emaill", children: "Email:" }), _jsx("input", { type: "text", id: "email", name: "email", value: formData.email, onChange: handleInputChange, onBlur: handleInputBlur, disabled: loading, className: fieldErrors.email && fieldErrors.email.length > 0 ? "error" : "" }), fieldErrors.email && fieldErrors.email.length > 0 && (_jsx("div", { className: "field-error", children: fieldErrors.email.map((error, index) => (_jsx("div", { className: "field-error-message", children: error }, index))) }))] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "M\u1EADt kh\u1EA9u:" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleInputChange, onBlur: handleInputBlur, disabled: loading, className: fieldErrors.password && fieldErrors.password.length > 0
                                    ? "error"
                                    : "" }), fieldErrors.password && fieldErrors.password.length > 0 && (_jsx("div", { className: "field-error", children: fieldErrors.password.map((error, index) => (_jsx("div", { className: "field-error-message", children: error }, index))) }))] }), _jsx("button", { type: "submit", className: `submit-btn ${isFormValid ? "valid" : ""}`, disabled: loading, children: loading
                            ? "Đang xử lý..."
                            : mode === "login"
                                ? "Đăng nhập"
                                : "Đăng ký" })] }), _jsx("div", { className: "mode-switch", children: mode === "login" ? (_jsxs("p", { children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n?", _jsx("button", { type: "button", onClick: () => handleModeChange("register"), disabled: loading, children: "\u0110\u0103ng k\u00FD" })] })) : (_jsxs("p", { children: ["\u0110\u00E3 c\u00F3 t\u00E0i kho\u1EA3n?", _jsx("button", { type: "button", onClick: () => handleModeChange("login"), disabled: loading, children: "\u0110\u0103ng nh\u1EADp" })] })) })] }));
};
