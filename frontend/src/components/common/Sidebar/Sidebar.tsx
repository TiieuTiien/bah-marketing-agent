import React from "react";
import './Sidebar.css';

const SidebarItem: React.FC<{ name: string, height?: number }> = ({ name, height = 6 }) => {
  return (
    <>
      <div className="sidebar-item" style={{ height: `${height}%` }}>{name}</div>
    </>
  )

}

const Sidebar: React.FC = () => {
  const [height, setHeight] = React.useState(6);

  return (
    <aside className="sidebar">
      <SidebarItem name="Dashboard" />
      <div className="divider" style={{ height: `${100 - height*3}%` }} />
      <SidebarItem name="Settings" />
      <SidebarItem name="Profile" />
    </aside>
  );
}

export default Sidebar;