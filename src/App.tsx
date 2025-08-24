import AdminPannel from "./pages/AdminPannel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignup from "./pages/AdminSignUp";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AdminPannel />} />
          <Route
            path="/add-product"
            element={<AddProduct />}
          />
          <Route
            path="/edit-product"
            element={<EditProduct />}
          />
          <Route path="/invetory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
