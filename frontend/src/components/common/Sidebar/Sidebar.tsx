import * as React from "react";
import { useEffect, useRef } from "react";
import { FaBars, FaEdit, FaLightbulb, FaTachometerAlt } from "react-icons/fa";
import { useHoverInside } from "../../../hooks/useHoverInside";
import "./Sidebar.css";
import { ideaApi } from "@/types/api";
import { Idea } from "@/types/idea";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  onViewChange: (
    view: "dashboard" | "workspace" | "idealist" | "ideaId"
  ) => void;
  currentView: string;
  selectedIdea: string | null;
  setSelectedIdea: (id: string | null) => void;
}

interface SidebarItemProps {
  name: string;
  isCollapsed: boolean;
  isActive: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  isCollapsed,
  isActive,
  onClick,
  children = null,
}) => {
  return (
    <>
      <div
        className={`sidebar-item ${isCollapsed ? "collapsed" : ""} ${
          isActive ? "active" : ""
        }`}
        onClick={onClick}
      >
        {children ? <div className="icon">{children}</div> : <></>}
        {!isCollapsed && <span className="item-name">{name}</span>}
      </div>
    </>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  selectedIdea,
  setSelectedIdea,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isLockedOpen, setIsLockedOpen] = React.useState(false);
  const [ideas, setIdeas] = React.useState<Idea[]>([]);
  const [visibleCount, setVisibleCount] = React.useState(10);
  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    try {
      const data = await ideaApi.getIdeas();
      setIdeas(data);
    } catch (error) {
      console.error('Failed to load ideas:', error);
    }
  };

  const getCurrentIdeaId = () => {
    const match = location.pathname.match(/\/app\/discussion\/(.+)/);
    return match ? match[1] : null;
  };

  const currentIdeaId = getCurrentIdeaId();

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

  const handleIdeaClick = (ideaId: string) => {
    setSelectedIdea(ideaId);
    navigate(`/app/discussion/${ideaId}`);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
    >
      <div>
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
            onClick={() => {
              onViewChange("dashboard");
              navigate("/app/dashboard");
            }}
          >
            <FaTachometerAlt />
          </SidebarItem>
          <SidebarItem
            name="Workspace"
            isCollapsed={isCollapsed}
            isActive={currentView === "workspace"}
            onClick={() => {
              onViewChange("workspace");
              navigate("/app/workspace");
            }}
          >
            <FaEdit />
          </SidebarItem>
          <SidebarItem
            name="Idea List"
            isCollapsed={isCollapsed}
            isActive={currentView === "idealist"}
            onClick={() => {
              onViewChange("idealist");
              navigate("/app/idealist");
            }}
          >
            <FaLightbulb />
          </SidebarItem>
        </div>
        {!isCollapsed && <div className="sidebar-title">Ý tưởng của bạn</div>}
      </div>
      <div className="scrollbar-outer">
        <div className="sidebar-ideas">
          {ideas.slice(0, visibleCount).map((idea: Idea) => (
            <SidebarItem
              key={idea.id}
              name={idea.title}
              isCollapsed={isCollapsed}
              isActive={!isCollapsed && idea.id === currentIdeaId}
              onClick={() => {
                handleIdeaClick(idea.id);
              }}
            />
          ))}
          {!isCollapsed && visibleCount < ideas.length && (
            <button
              className="sidebar-loadmore"
              onClick={() => setVisibleCount(visibleCount + 10)}
            >
              Tải thêm...
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
