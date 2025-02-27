import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Verify from './pages/Verify';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import PostDetails from './pages/PostDetails';
import Publicize from './pages/Publicize';
import CreatePost from './pages/CreatePost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/publicize" element={<Publicize />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;