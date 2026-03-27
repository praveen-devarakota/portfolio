import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Cp from "./pages/Cp.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/competitive" element={<Cp />} />
      </Routes>
    </>
  );
}

export default App;