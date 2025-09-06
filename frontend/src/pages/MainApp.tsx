import { useState } from "react";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";

export default function MainApp() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleSidebarCollapseChange = (isCollapsed: boolean) => {
    setIsSidebarCollapsed(isCollapsed);
  };

  return (
    <div className="app-layout">
      <Header />
      <div className="content-container">
        <Sidebar onCollapseChange={handleSidebarCollapseChange} />
        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <h2>Dashboard</h2>
          <p>Welcome to the main dashboard</p>
        </main>
      </div>
    </div>
  );
}
