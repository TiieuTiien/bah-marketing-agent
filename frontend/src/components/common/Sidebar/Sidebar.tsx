import React, { useEffect, useRef } from "react";
import "./Sidebar.css";
import { FaBars, FaCog, FaCubes, FaEdit, FaUser } from "react-icons/fa";
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

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isLockedOpen, setIsLockedOpen] = React.useState(false);


  const sidebarRef = useHoverInside((isHovering) =>  {
    if(!isLockedOpen){
      setIsCollapsed(!isHovering);
    }
  });

  const toggleLockedState = () => {
    const newLockedState = !isLockedOpen;
    setIsLockedOpen(newLockedState);
    setIsCollapsed(!newLockedState);
  };

  useEffect(() => {
    if(isLockedOpen){
      setIsCollapsed(false);
    }
  }, [isLockedOpen]);

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
