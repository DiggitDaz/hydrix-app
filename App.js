import React, { useState, useEffect } from 'react';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import Join from './src/pages/Join';
import Home from './src/pages/Home';
import TeamList from './src/pages/TeamList';
import ImageUpload from './src/pages/ImageUpload';
import SuccessModal from './components/Join/SuccessModal';
import Login from './src/pages/Login';
import ForgotPassword from './src/pages/ForgotPassword';
import QuickLinks from './src/pages/QuickLinks';
import RewardAd from './src/pages/RewardAd';
import ResetPassword from './src/pages/ResetPassword';
import Settings from './src/pages/Settings';
import { AuthProvider, useAuth } from './src/utils/AuthContext';
import Welcome from './src/pages/Welcome';
import './src/utils/AxiosConfig';
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';
import { ImageProvider } from './src/utils/ImageContext';
import mobileAds from 'react-native-google-mobile-ads';
import * as Sentry from "@sentry/react-native";
import { SENTRY_DNS } from '@env';





AppRegistry.registerComponent(App);


mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

const App = () => {

  Sentry.init({
    dsn: SENTRY_DNS,
    debug: true,
  });

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      await notifee.requestPermission(); // Request permissions
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: notifee.AndroidImportance.HIGH,
      });
    };
  
    setupNotifications();
  }, []);
  


  

  return (
  
    <NativeRouter>
      <AuthProvider>
        <ImageProvider>
        {showWelcome ? <Welcome /> : <AppRoutes />}
        </ImageProvider>
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
      <Route path="/teamlist" element={token ? <TeamList /> : <Navigate to="/login" />} />
      <Route path="/settings" element={token ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/join" element={<Join />} />
      <Route path="/imageUpload" element={<ImageUpload />} />
      <Route path="/quicklinks" element={<QuickLinks />} />
      <Route path="/successModal" element={<SuccessModal />} />
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/RewardAd" element={<RewardAd />} />


    </Routes>
  );
};

export default Sentry.wrap(App);
