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
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null, userName: '' });
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Debounce search term
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
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(deleteModal.userId);
      setDeleteModal({ isOpen: false, userId: null, userName: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openDeleteModal = (user) => {
    setDeleteModal({ isOpen: true, userId: user.id, userName: user.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, userId: null, userName: '' });
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
                        <Button
                          size="small"
                          variant="danger"
                          onClick={() => openDeleteModal(user)}
                        >
                          Delete
                        </Button>
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
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        title="Confirm Delete"
        footer={
          <>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete user <strong>{deleteModal.userName}</strong>?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default UserList;
