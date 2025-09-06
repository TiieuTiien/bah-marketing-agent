import "./Header.css"; // Assuming you have some styles for the header
import UserProfile from "../UserProfile/UserProfile";
import avatarPlaceholder from "../../../assets/blonde_500.png";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Member",
    avatarUrl: avatarPlaceholder,
    stats: {
      totalIdeas: 5,
      inProgress: 2,
      completed: 3,
    },
  };
  return (
    <nav className="header-container">
      <div className="logo">LOGO</div>
      <UserProfile
        user={user}
      />
    </nav>
  );
};

export default Header;
