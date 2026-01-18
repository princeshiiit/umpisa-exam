import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            User Management System
          </Link>
          {user && (
            <div className="navbar-menu">
              <Link to="/users" className="navbar-link">
                Users
              </Link>
              <div className="navbar-user">
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
