import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { AuthProvider, useAuth } from './contexts/Auth';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const UnauthenticatedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="login"
            element={<UnauthenticatedRoute element={<Login />} />}
          />
          <Route
            path="register"
            element={<UnauthenticatedRoute element={<Register />} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
