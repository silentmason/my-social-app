import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import necessary components
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { AuthProvider, AuthContext } from './AuthContext'; // Import AuthProvider

function App() {
  const { isLoggedIn } = useContext(AuthContext) || { isLoggedIn: false }; // Safely access context

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/main" /> : <LoginPage />}
        />
        <Route
          path="/main"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}


const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;