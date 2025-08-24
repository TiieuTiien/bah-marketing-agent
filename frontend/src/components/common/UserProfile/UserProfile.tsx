import { useRef, useState } from 'react';
import './UserProfile.css';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface UserProfileProps {
  user: {
    name: string;
    avatarUrl: string;
  };
}

function UserProfile({ user }: UserProfileProps) {
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

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
  <div ref={ref} className="profile-dropdown">
      <button onClick={handleToggle} className="avatar-button">
        <img src={user.avatarUrl} alt="User Avatar" className="avatar-small" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <img src={user.avatarUrl} alt="User Avatar" className="avatar-large" />
            <span className="username">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;