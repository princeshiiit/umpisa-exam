import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await userService.getUserById(id);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <h1>User Details</h1>
        <div className="header-actions">
          <Button variant="secondary" onClick={() => navigate('/users')}>
            Back to List
          </Button>
          {isAdmin && (
            <Button variant="primary" onClick={() => navigate(`/users/${id}/edit`)}>
              Edit User
            </Button>
          )}
        </div>
      </div>

      <Card>
        <div className="detail-grid">
          <div className="detail-item">
            <label className="detail-label">Name</label>
            <p className="detail-value">{user.name}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Email</label>
            <p className="detail-value">{user.email}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Role</label>
            <p className="detail-value">
              <span className={`badge badge-${user.role}`}>{user.role}</span>
            </p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Status</label>
            <p className="detail-value">
              <span className={`badge badge-${user.status}`}>{user.status}</span>
            </p>
          </div>

          <div className="detail-item">
            <label className="detail-label">Created At</label>
            <p className="detail-value">{user.createdAt}</p>
          </div>

          <div className="detail-item">
            <label className="detail-label">User ID</label>
            <p className="detail-value">{user.id}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDetail;
