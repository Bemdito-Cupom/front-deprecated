import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { SpeedDialWithTextOutside } from "../development/SpeedDial";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./UserLayout";
import EstablishmentLayout from "./EstablishmentLayout";

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const handleRoleChange = (event: CustomEvent) => {
      setRole(event.detail);
    };

    window.addEventListener("roleChanged", handleRoleChange as EventListener);

    return () => {
      window.removeEventListener(
        "roleChanged",
        handleRoleChange as EventListener,
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderLayout = () => {
    switch (role) {
      case "admin":
        return (
          <AdminLayout
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        );
      case "user":
        return (
          <UserLayout
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        );
      case "establishment":
        return (
          <EstablishmentLayout
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
          />
        );
      default:
        return <div>Invalid role. Please select a valid role.</div>;
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
