// import { useState } from "react";
import AdminPannel from "./pages/AdminPannel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignup from "./pages/AdminSignUp";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
// import AdminTools from "./components/AdminTools.tsx"
import "./App.css";
// import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin-pannel.local" element={<AdminPannel/>}/>
          <Route path="/admin-pannel.local/add-product" element={<AddProduct/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
