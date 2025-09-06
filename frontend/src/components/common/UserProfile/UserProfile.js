import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import './UserProfile.css';
import { useClickOutside } from '../../../hooks/useClickOutside';
function UserProfile({ user }) {
    // State to manage whether the dropdown is open or closed
    const [isOpen, setIsOpen] = useState(false);
    // Function to handle the avatar click
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        console.log('User logged out');
        setIsOpen(false);
    };
    const ref = useRef(null);
    useClickOutside(ref, () => setIsOpen(false), isOpen);
    return (_jsxs("div", { ref: ref, className: "profile-dropdown", children: [_jsx("button", { onClick: handleToggle, className: "avatar-button", children: _jsx("img", { src: user.avatarUrl, alt: "User Avatar", className: "avatar-small" }) }), isOpen && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("div", { className: "dropdown-header", children: [_jsx("img", { src: user.avatarUrl, alt: "User Avatar", className: "avatar-large" }), _jsx("span", { className: "username", children: user.name })] }), _jsx("button", { onClick: handleLogout, className: "logout-button", children: "Log out" })] }))] }));
}
export default UserProfile;
