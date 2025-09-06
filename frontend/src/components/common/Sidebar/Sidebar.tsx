import React, { useEffect } from "react";
import "./Sidebar.css";
import { FaBars, FaCog, FaCubes, FaUser } from "react-icons/fa";
import { useHoverInside } from '../../../hooks/useHoverInside';

interface SidebarItemProps {
  name: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, isCollapsed, children }) => {
  return (
    <>
      <div className={`sidebar-item ${isCollapsed ? "collapsed" : ""}`}>
        <div className="icon">
          {children}
        </div>
        {!isCollapsed && <span className="item-name">{name}</span>}
      </div>
    </>
  );
};

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isLockedOpen, setIsLockedOpen] = React.useState(false);


  const sidebarRef = useHoverInside((isHovering) =>  {
    if(!isLockedOpen){
      const newCollapsed = !isHovering;
      setIsCollapsed(newCollapsed);
      onCollapseChange?.(newCollapsed);
    }
  });

  const toggleLockedState = () => {
    const newLockedState = !isLockedOpen;
    setIsLockedOpen(newLockedState);
    const newCollapsed = !newLockedState;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  useEffect(() => {
    if(isLockedOpen){
      setIsCollapsed(false);
      onCollapseChange?.(false);
    }
  }, [isLockedOpen, onCollapseChange]);

  // Notify parent of initial state
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return (
    <aside ref={sidebarRef} className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`sidebar-header ${isCollapsed ? "collapsed" : ""}`}>
        <button onClick={toggleLockedState} className="toggle-button">
          <FaBars />
        </button>
      </div>
      <div className="sidebar-items">
        <SidebarItem name="Dashboard" isCollapsed={isCollapsed}>
          <FaCubes />
        </SidebarItem>
        <SidebarItem name="Settings" isCollapsed={isCollapsed}>
          <FaCog />
        </SidebarItem>
        <SidebarItem name="Profile" isCollapsed={isCollapsed}>
          <FaUser />
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
