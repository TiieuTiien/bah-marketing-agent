import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import MainApp from './pages/MainApp';
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/auth/*", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/app/*", element: _jsx(MainApp, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/auth/login", replace: true }) })] }));
}
export default App;
