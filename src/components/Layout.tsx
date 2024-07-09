import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useAuth } from '../contexts/Auth';
import { SpeedDialWithTextOutside } from '../development/SpeedDial';
import UserHome from '../pages/home/user/UserHome';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);

    const handleRoleChange = (event: CustomEvent) => {
      setRole(event.detail);
    };

    window.addEventListener('roleChanged', handleRoleChange as EventListener);

    return () => {
      window.removeEventListener('roleChanged', handleRoleChange as EventListener);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderLayout = () => {
    switch (role) {
      case 'admin':
        return (
          <section className="w-screen h-screen bg-[#eee] flex">
            <aside className="bg-red-900 h-full w-[20rem] rounded-r-lg">
              {/* Admin sidebar content */}
            </aside>
            <main className="bg-white p-6 w-[80%] h-full flex flex-col justify-between">
              <Navbar className="py-2 px-4 lg:px-8 lg:py-4">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                  <Typography
                    as="a"
                    href="/"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                  >
                    <span>Admin Dashboard</span>
                  </Typography>
                  {isAuthenticated && (
                    <Button onClick={handleLogout}>Logout</Button>
                  )}
                </div>
              </Navbar>
              <article className="bg-blue-100 w-full h-[90%]">
                {/* {children} */}
              </article>
            </main>
          </section>
        );
      case 'user':
        return (
          <section className="w-screen h-screen flex">
            <main className="bg-[#eee] py-6 px-2 w-full h-full flex flex-col justify-between">
              <nav className="px-2">
              <Navbar className="py-2 px-4 lg:px-8 lg:py-4">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                  <Typography
                    as="a"
                    href="/"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                  >
                    <span>User Dashboard</span>
                  </Typography>
                  {isAuthenticated && (
                    <Button onClick={handleLogout}>Logout</Button>
                  )}
                </div>
              </Navbar>
              </nav>
              <article className="w-full h-[90%]">
                <UserHome />
              </article>
            </main>
          </section>
        );
      case 'establishment':
        return (
          <section className="w-screen h-screen bg-[#eee] flex">
            <aside className="bg-blue-900 h-full w-[15rem] rounded-r-lg">
              {/* Establishment sidebar content */}
            </aside>
            <main className="bg-white p-6 w-[85%] h-full flex flex-col justify-between">
              <Navbar className="py-2 px-4 lg:px-8 lg:py-4">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                  <Typography
                    as="a"
                    href="/"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5 font-normal"
                  >
                    <span>Establishment Dashboard</span>
                  </Typography>
                  {isAuthenticated && (
                    <Button onClick={handleLogout}>Logout</Button>
                  )}
                </div>
              </Navbar>
              <article className="bg-yellow-100 w-full h-[90%]">
                {/* {children} */}
              </article>
            </main>
          </section>
        );
      default:
        return (
          <div>Invalid role. Please select a valid role.</div>
        );
    }
  };

  return (
    <>
      {renderLayout()}
      <SpeedDialWithTextOutside />
    </>
  );
};

export default Layout;
