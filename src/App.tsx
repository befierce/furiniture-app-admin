import AdminPannel from "./pages/AdminPannel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminSignup from "./pages/AdminSignUp";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import "./App.css";
function App() {
  function ProtectedRoutes({ children }: { children: React.ReactNode }) {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      alert("please login first");
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<AdminSignup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <AdminPannel />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/add-product"
            element={
              <ProtectedRoutes>
                <AddProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/edit-product"
            element={
              <ProtectedRoutes>
                <EditProduct />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/invetory"
            element={
              <ProtectedRoutes>
                <Inventory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
