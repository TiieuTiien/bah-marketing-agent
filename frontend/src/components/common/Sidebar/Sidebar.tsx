import * as React from "react";
import { useEffect, useRef } from "react";
import {
  FaBars,
  FaEdit,
  FaTachometerAlt,
} from "react-icons/fa";
import { useHoverInside } from "../../../hooks/useHoverInside";
import "./Sidebar.css";

interface SidebarProps {
  currentView: "dashboard" | "workspace";
  onViewChange: (view: "dashboard" | "workspace") => void;
}

interface SidebarItemProps {
  name: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  isCollapsed,
  isActive,
  onClick,
  children,
}) => {
  return (
    <>
      <div
        className={`sidebar-item ${isCollapsed ? "collapsed" : ""} ${
          isActive ? "active" : ""
        }`}
        onClick={onClick}
      >
        <div className="icon">{children}</div>
        {!isCollapsed && <span className="item-name">{name}</span>}
      </div>
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isLockedOpen, setIsLockedOpen] = React.useState(false);

  const sidebarRef = useHoverInside((isHovering) => {
    if (!isLockedOpen) {
      setIsCollapsed(!isHovering);
    }
  });

  const toggleLockedState = () => {
    const newLockedState = !isLockedOpen;
    setIsLockedOpen(newLockedState);
    setIsCollapsed(!newLockedState);
  };

  useEffect(() => {
    if (isLockedOpen) {
      setIsCollapsed(false);
    }
  }, [isLockedOpen]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
    >
      <div className={`sidebar-header ${isCollapsed ? "collapsed" : ""}`}>
        <button onClick={toggleLockedState} className="toggle-button">
          <FaBars />
        </button>
      </div>
      <div className="sidebar-items">
        <SidebarItem
          name="Dashboard"
          isCollapsed={isCollapsed}
          isActive={currentView === "dashboard"}
          onClick={() => onViewChange("dashboard")}
        >
          <FaTachometerAlt />
        </SidebarItem>
        <SidebarItem
          name="Workspace"
          isCollapsed={isCollapsed}
          isActive={currentView === "workspace"}
          onClick={() => onViewChange("workspace")}
        >
          <FaEdit />
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
