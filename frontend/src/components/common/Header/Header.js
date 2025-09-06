import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Header.css'; // Assuming you have some styles for the header
import UserProfile from "../UserProfile/UserProfile";
import avatarPlaceholder from '../../../assets/blonde_500.png';
const Header = () => {
    return (_jsxs("nav", { className: "header-container", children: [_jsx("div", { className: "logo", children: "LOGO" }), _jsxs("ul", { className: "header", children: [_jsx("li", { children: "Home" }), _jsx("span", { children: "|" }), _jsx("li", { children: "About" }), _jsx("span", { children: "|" }), _jsx("li", { children: "Contact" })] }), _jsx(UserProfile, { user: { name: 'John Doe', avatarUrl: avatarPlaceholder } })] }));
};
export default Header;
