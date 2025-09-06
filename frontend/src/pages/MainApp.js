import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
export default function MainApp() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const handleSidebarCollapseChange = (isCollapsed) => {
        setIsSidebarCollapsed(isCollapsed);
    };
    return (_jsxs("div", { className: "app-layout", children: [_jsx(Header, {}), _jsxs("div", { className: "content-container", children: [_jsx(Sidebar, { onCollapseChange: handleSidebarCollapseChange }), _jsxs("main", { className: `main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`, children: [_jsx("h2", { children: "Dashboard" }), _jsx("p", { children: "Welcome to the main dashboard" })] })] })] }));
}
