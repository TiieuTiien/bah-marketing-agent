import React from "react";
import './Header.css'; // Assuming you have some styles for the header
import UserProfile from "../UserProfile/UserProfile";
import avatarPlaceholder from '../../../assets/blonde_500.png';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className="header-container">
        <div className="logo">LOGO</div>
        <ul className="header">
            <li>Home</li>
            <span>|</span>
            <li>About</li>
            <span>|</span>
            <li>Contact</li>
        </ul>
        <UserProfile user={{ name: 'John Doe', avatarUrl: avatarPlaceholder }} />
    </nav>
  );
}

export default Header; 