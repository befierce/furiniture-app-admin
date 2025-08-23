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
          <Route path="/admin-pannel.local" element={<AdminPannel />} />
          <Route
            path="/admin-pannel.local/add-product"
            element={<AddProduct />}
          />
          <Route
            path="/admin-pannel.local/edit-product"
            element={<EditProduct />}
          />
          <Route path="/admin-pannel.local/invetory" element={<Inventory />} />
          <Route path="/admin-pannel.local/orders" element={<Orders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
