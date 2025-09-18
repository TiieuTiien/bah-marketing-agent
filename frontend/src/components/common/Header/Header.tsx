import "./Header.css"; // Assuming you have some styles for the header
import UserProfile from "../../userprofile/UserProfile";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className="header-container">
      <div className="logo">LOGO</div>
    </nav>
  );
};

export default Header;
