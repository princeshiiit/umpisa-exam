import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome, {user?.name}!</h1>
      
      <div className="dashboard-grid">
        <Card title="User Management">
          <p>Manage all users in the system. Create, update, view, and delete user accounts.</p>
          <Link to="/users">
            <Button variant="primary">View Users</Button>
          </Link>
        </Card>

        <Card title="System Statistics">
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">4</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active Users</span>
              <span className="stat-value">3</span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Quick Actions" className="quick-actions-card">
        <div className="quick-actions">
          <Link to="/users/new">
            <Button variant="success">Create New User</Button>
          </Link>
          <Link to="/users">
            <Button variant="outline">View All Users</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
