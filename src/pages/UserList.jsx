import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [actionModal, setActionModal] = useState({ isOpen: false, userId: null, userName: '', action: '' });
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (debouncedSearchTerm) params.search = debouncedSearchTerm;
      if (filterStatus) params.status = filterStatus;
      
      const response = await userService.getUsers(params);
      setUsers(Array.isArray(response) ? response : (response.data || []));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleAction = async () => {
    try {
      if (actionModal.action === 'deactivate') {
        await userService.deactivateUser(actionModal.userId);
      } else if (actionModal.action === 'reactivate') {
        await userService.reactivateUser(actionModal.userId);
      }
      setActionModal({ isOpen: false, userId: null, userName: '', action: '' });
      fetchUsers();
    } catch (error) {
      console.error(`Error ${actionModal.action}ing user:`, error);
    }
  };

  const openActionModal = (user, action) => {
    setActionModal({ isOpen: true, userId: user.id, userName: user.name, action });
  };

  const closeActionModal = () => {
    setActionModal({ isOpen: false, userId: null, userName: '', action: '' });
  };

  if (initialLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>User Management</h1>
        <Link to="/users/new">
          <Button variant="success">+ Create User</Button>
        </Link>
      </div>

      <Card>
        <div className="filters">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {loading && !initialLoading && (
          <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </div>
        )}

        <div className="table-container" style={{ opacity: loading && !initialLoading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.createdAt}</td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          size="small"
                          variant="primary"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="secondary"
                          onClick={() => navigate(`/users/${user.id}/edit`)}
                        >
                          Edit
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="small"
                            variant="danger"
                            onClick={() => openActionModal(user, 'deactivate')}
                          >
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            variant="success"
                            onClick={() => openActionModal(user, 'reactivate')}
                          >
                            Reactivate
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={actionModal.isOpen}
        onClose={closeActionModal}
        title={`Confirm ${actionModal.action === 'deactivate' ? 'Deactivation' : 'Reactivation'}`}
        footer={
          <>
            <Button variant="secondary" onClick={closeActionModal}>
              Cancel
            </Button>
            <Button 
              variant={actionModal.action === 'deactivate' ? 'danger' : 'success'} 
              onClick={handleAction}
            >
              {actionModal.action === 'deactivate' ? 'Deactivate' : 'Reactivate'}
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to {actionModal.action} user <strong>{actionModal.userName}</strong>?
        </p>
        <p>
          {actionModal.action === 'deactivate' 
            ? 'The user will no longer be able to access the system.' 
            : 'The user will regain access to the system.'}
        </p>
      </Modal>
    </div>
  );
};

export default UserList;
