import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
// import {Register} from '../pages/register/Register';
// import {Home} from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;
