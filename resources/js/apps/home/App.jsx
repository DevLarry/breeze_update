import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import VerifyPage from './components/VerifyPage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import PostDetails from './pages/PostDetails';
import Publicize from './pages/Publicize';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/404';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SecureRoutes from './SecureRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<SecureRoutes><Dashboard /></SecureRoutes>} />
        <Route path="/profile" element={<SecureRoutes><Profile /></SecureRoutes>} />
        <Route path="/create" element={<SecureRoutes><CreatePost /></SecureRoutes>} />
        
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/publicize" element={<Publicize />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;