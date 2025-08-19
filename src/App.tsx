// import { useState } from "react";
import AdminPannel from "./pages/AdminPannel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignup from "./pages/AdminSignUp";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin-pannel.local" element={<AdminPannel/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
