import { useState } from "react";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import "@/pages/MainApp/MainApp.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type View = "dashboard" | "workspace" | "idealist" | "discussion";

export default function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView =
    (location.pathname.split("/").pop() as View) || "dashboard";

  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

  const handleViewChange = (view: View) => {
    setSelectedIdea(null);
    navigate(`/app/${view}`, { replace: true });
  };

  return (
    <div className="mainapp-container">
      <Sidebar
        onViewChange={handleViewChange}
        currentView={currentView}
        selectedIdea={selectedIdea}
        setSelectedIdea={setSelectedIdea}
      />
      <div className="main-section">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
