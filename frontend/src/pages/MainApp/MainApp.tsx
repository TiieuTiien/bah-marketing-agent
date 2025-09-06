import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { useState } from "react";
import "@/pages/MainApp/MainApp.css";
import Workspace from "@/components/workspace/Workspace";

type View = "dashboard" | "workspace";

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>("workspace");

  return (
    <div className="mainapp-container">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      <div className="main-section">
        <Header />
        <main className="main-content">
          {currentView === "dashboard" ? <Dashboard /> : <Workspace />}
        </main>
      </div>
    </div>
  );
}
