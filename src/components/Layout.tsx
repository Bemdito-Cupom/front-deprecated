import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useAuth } from '../contexts/Auth';

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span>Your Logo</span>
          </Typography>
          {isAuthenticated && (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
