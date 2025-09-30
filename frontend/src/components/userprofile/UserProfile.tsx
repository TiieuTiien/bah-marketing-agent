import "./UserProfile.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { useAuth } from "@/context/useAuthContext";
import avatarPlaceholder from "../../assets/blonde_500.png";

interface UserProfileProps {
  isCollapsed?: boolean;
}

function UserProfile({ isCollapsed = false }: UserProfileProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  console.log("User info: ", user);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <div ref={ref} className={`profile-dropdown sidebar-profile ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={handleToggle} className="avatar-button">
        <img src={avatarPlaceholder} alt="User Avatar" className="avatar-small" />
        {!isCollapsed && (
          <div className="user-info-inline">
            <span className="username-inline">{user?.username || "Guest"}</span>
            <span className="email-inline">{user?.email || "guest@gmail.com"}</span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img
              src={avatarPlaceholder}
              alt="User Avatar"
              className="avatar-large"
            />
            <div className="user-info">
              <span className="username">{user?.username || "Guest"}</span>
              <span className="email">{user?.email || "guest@gmail.com"}</span>
            </div>
          </div>

          <div className="dropdown-actions">
            <button onClick={handleLogout} className="action-button logout">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;