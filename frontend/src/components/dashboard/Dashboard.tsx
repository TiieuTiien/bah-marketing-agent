import "@/components/dashboard/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <span className="activity-text">
                Created new marketing campaign
              </span>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✨</span>
              <span className="activity-text">
                Generated content for social media
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-button">Create Campaign</button>
            <button className="action-button">Generate Content</button>
            <button className="action-button">View Analytic</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
