import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect } from "react";
import "./Sidebar.css";
import { FaBars, FaCog, FaCubes, FaUser } from "react-icons/fa";
import { useHoverInside } from '../../../hooks/useHoverInside';
const SidebarItem = ({ name, isCollapsed, children }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: `sidebar-item ${isCollapsed ? "collapsed" : ""}`, children: [_jsx("div", { className: "icon", children: children }), !isCollapsed && _jsx("span", { className: "item-name", children: name })] }) }));
};
const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const [isLockedOpen, setIsLockedOpen] = React.useState(false);
    const sidebarRef = useHoverInside((isHovering) => {
        if (!isLockedOpen) {
            setIsCollapsed(!isHovering);
        }
    });
    const toggleLockedState = () => {
        const newLockedState = !isLockedOpen;
        setIsLockedOpen(newLockedState);
        setIsCollapsed(!newLockedState);
    };
    useEffect(() => {
        if (isLockedOpen) {
            setIsCollapsed(false);
        }
    }, [isLockedOpen]);
    return (_jsxs("aside", { ref: sidebarRef, className: `sidebar ${isCollapsed ? "collapsed" : ""}`, children: [_jsx("div", { className: `sidebar-header ${isCollapsed ? "collapsed" : ""}`, children: _jsx("button", { onClick: toggleLockedState, className: "toggle-button", children: _jsx(FaBars, {}) }) }), _jsxs("div", { className: "sidebar-items", children: [_jsx(SidebarItem, { name: "Dashboard", isCollapsed: isCollapsed, children: _jsx(FaCubes, {}) }), _jsx(SidebarItem, { name: "Settings", isCollapsed: isCollapsed, children: _jsx(FaCog, {}) }), _jsx(SidebarItem, { name: "Profile", isCollapsed: isCollapsed, children: _jsx(FaUser, {}) })] })] }));
};
export default Sidebar;
