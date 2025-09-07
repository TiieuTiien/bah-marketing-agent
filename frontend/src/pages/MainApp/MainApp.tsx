import { useState } from "react";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import Workspace from "@/components/workspace/Workspace";
import IdeaList from "@/components/idealist/IdeaList";
import "@/pages/MainApp/MainApp.css";

type View = "dashboard" | "workspace" | "idealist";

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>("idealist");

  return (
    <div className="mainapp-container">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      <div className="main-section">
        <Header />
        <main className="main-content">
          {currentView === "workspace" && <Workspace />}
          {currentView === "idealist" && <IdeaList />}
          {currentView === "dashboard" && <Dashboard />}
        </main>
      </div>
    </div>
  );
}
