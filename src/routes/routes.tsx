import React from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {Login} from '../pages/login/Login';
// import {Register} from '../pages/register/Register';
// import {Home} from '../pages/Home';

const Routes: React.FC = () => {
  return (
  <Routes>
      <Route path="/login" element={<Login />}/>
    </Routes>
  );
};

export default Routes;
