import '@/components/workspace/Workspace.css';

const Workspace: React.FC = () => {
  return (
    <div className="workspace">
      <h2 className="workspace-title">Workspace</h2>
      
      <div className="workspace-content">
        <div className="tools-section">
          <h3>Marketing Tools</h3>
          <div className="tools-grid">
            <div className="tool-card">
              <h4>Content Generator</h4>
              <p>Generate marketing content using AI</p>
              <button className="tool-button">Open Tool</button>
            </div>
            <div className="tool-card">
              <h4>Campaign Manager</h4>
              <p>Manage your marketing campaigns</p>
              <button className="tool-button">Open Tool</button>
            </div>
            <div className="tool-card">
              <h4>Analytics</h4>
              <p>View campaign performance</p>
              <button className="tool-button">Open Tool</button>
            </div>
          </div>
        </div>
        
        <div className="workspace-section">
          <h3>Current Projects</h3>
          <div className="projects-list">
            <div className="project-item">
              <span className="project-status active"></span>
              <span className="project-name">Social Media Campaign</span>
              <span className="project-date">Started: 2023-09-01</span>
            </div>
            <div className="project-item">
              <span className="project-status pending"></span>
              <span className="project-name">Email Newsletter</span>
              <span className="project-date">Due: 2023-09-15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;