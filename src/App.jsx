import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout>
                  <UserList />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/users/new"
            element={
              <PrivateRoute>
                <Layout>
                  <UserForm />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <UserDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/users/:id/edit"
            element={
              <PrivateRoute>
                <Layout>
                  <UserForm />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
