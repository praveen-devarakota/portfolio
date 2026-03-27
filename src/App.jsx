import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Cp from "./pages/Cp.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/competitive" element={<Cp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;