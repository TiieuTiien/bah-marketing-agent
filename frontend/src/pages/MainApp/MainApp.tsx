import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { useState } from "react";
import "@/pages/MainApp/MainApp.css";
import Workspace from "@/components/workspace/Workspace";
import IdeaList from "@/components/idealist/IdeaList";
import { Idea } from "@/types/idea";
import IdeaForm from "@/components/ideaform/IdeaForm";

type View = "dashboard" | "workspace" | "idealist";

export default function MainApp() {
  const [currentView, setCurrentView] = useState<View>("workspace");

  const [selectedIdea, setSelectedIdea] = useState<Idea | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleIdeaSelect = (idea: Idea) => {
    setSelectedIdea(idea);
    setIsFormOpen(true);
  };

  const handleCreateIdea = () => {
    setSelectedIdea(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="mainapp-container">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      <div className="main-section">
        <Header />
        <main className="main-content">
          {currentView === "workspace" && <Workspace />}
          {currentView === "idealist" && (
            <>
              <button className="create-idea-btn" onClick={handleCreateIdea}>
                + Tạo ý tưởng mới
              </button>
              <IdeaList onIdeaSelect={handleIdeaSelect} />
              {isFormOpen && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <IdeaForm
                      idea={selectedIdea}
                      onSubmit={() => {
                        setIsFormOpen(false);
                        setSelectedIdea(undefined);
                      }}
                      onCancel={() => {
                        setIsFormOpen(false);
                        setSelectedIdea(undefined);
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          {currentView === "dashboard" && <Dashboard />}
        </main>
      </div>
    </div>
  );
}
