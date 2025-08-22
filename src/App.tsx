import AdminPannel from "./pages/AdminPannel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignup from "./pages/AdminSignUp";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory"
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin-pannel.local" element={<AdminPannel/>}/>
          <Route path="/admin-pannel.local/add-product" element={<AddProduct/>}/>
          <Route path="/admin-pannel.local/invetory" element={<Inventory/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
