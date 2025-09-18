import "./UserProfile.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { useAuth } from "@/context/useAuthContext";

interface UserStats {
  totalIdeas: number;
  inProgress: number;
  completed: number;
}

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatarUrl: string;
    stats: UserStats;
  };
  isCollapsed?: boolean;
}

function UserProfile({ user, isCollapsed = false }: UserProfileProps) {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const handleViewProfile = () => {
    console.log("Navigate to profile page");
    setIsOpen(false);
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
    setIsOpen(false);
  };

  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <div ref={ref} className={`profile-dropdown sidebar-profile ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={handleToggle} className="avatar-button">
        <img src={user.avatarUrl} alt="User Avatar" className="avatar-small" />
        {!isCollapsed && (
          <div className="user-info-inline">
            <span className="username-inline">{user.name}</span>
            <span className="email-inline">{user.email}</span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="avatar-large"
            />
            <div className="user-info">
              <span className="username">{user.name}</span>
              <span className="email">{user.email}</span>
              <span className="role">{user.role}</span>
            </div>
          </div>

          <div className="dropdown-stats">
            <div className="stat-item">
              <span className="stat-label">Tổng ý tưởng</span>
              <span className="stat-value">{user.stats.totalIdeas}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Đang thực hiện</span>
              <span className="stat-value">{user.stats.inProgress}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Đã hoàn thành</span>
              <span className="stat-value">{user.stats.completed}</span>
            </div>
          </div>

          <div className="dropdown-actions">
            <button onClick={handleViewProfile} className="action-button">
              View Profile
            </button>
            <button onClick={handleSettings} className="action-button">
              Settings
            </button>
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