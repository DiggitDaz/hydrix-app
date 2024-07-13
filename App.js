import React, { useState, useEffect } from 'react';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import Join from './src/pages/Join';
import Home from './src/pages/Home';
import User from './src/pages/User';
import Team from './src/pages/Team';
import SuccessModal from './components/Join/SuccessModal';
import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';
import ResetPassword from './src/pages/ResetPassword';
import { AuthProvider, useAuth } from './src/utils/AuthContext';
import Welcome from './src/pages/Welcome';
import './src/utils/AxiosConfig'; 

const App = () => {

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NativeRouter>
      <AuthProvider>
        {showWelcome ? <Welcome /> : <AppRoutes />}
      </AuthProvider>
    </NativeRouter>
  );
};

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route path="/user" element={token ? <User /> : <Navigate to="/login" />} />
      <Route path="/team" element={token ? <Team /> : <Navigate to="/login" />} />
      <Route path="/join" element={<Join />} />
      <Route path="/successModal" element={<SuccessModal />} />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />

    </Routes>
  );
};

export default App;
