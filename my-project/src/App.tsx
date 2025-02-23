import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LikedUniversities from "./pages/LikedUniversities";
import UniversityDetails from "./pages/UniversityDetails";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liked" element={<LikedUniversities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/university/:name" element={<UniversityDetails />} /> {/* ✅ Ensure this exists */}
      </Routes>
    </Router>
  );
};

export default App;
