import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AuthForm } from "../components/auth/AuthForm";
import '@/components/auth/auth.css';
export const AuthPage = () => {
    const [mode, setMode] = useState("login");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            // TODO: Mô phỏng API call delay
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Auth data", data);
            console.log("Mode", mode);
            // TODO: Thay bằng API call
            if (mode === "login") {
                alert("Đăng nhập thành công");
            }
            else {
                alert("Đăng ký thành công!");
            }
        }
        catch (error) {
            console.error("Auth error:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "auth-page", children: _jsxs("div", { className: "auth-container", children: [_jsxs("div", { className: "auth-header", children: [_jsx("h2", { children: "BAH Marketing Agent" }), _jsx("p", { children: "Qu\u1EA3n l\u00FD \u00FD t\u01B0\u1EDFng v\u1EDBi AI" })] }), _jsx(AuthForm, { mode: mode, onSubmit: handleSubmit, onModeChange: setMode, loading: loading })] }) }));
};
