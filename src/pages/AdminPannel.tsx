import { useState } from "react";
import "./AdminPannel.css";
import AdminTools from "../components/AdminTools";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
// import { } from "../store/store";
import { useNavigate, Navigate } from "react-router-dom";

const AdminPannel = () => {
  const [ setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const logoutHandler = () => {
    console.log("logout button clicked");
    dispatch(logout());
    localStorage.clear();
    navigate("/login"); 
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="browser-wrapper">
      <div className="browser-topbar">
        <div className="browser-buttons">
          <span className="btn red"></span>
          <span className="btn yellow"></span>
          <span className="btn green"></span>
        </div>
        <div className="browser-url">https://admin-panel.local</div>
      </div>

      <div className="browser-tabs">
        <div
          className={`tab admin-tools`}
          onClick={() => setActiveTab("admin-tools")}
        >
          Admin-Tools
          <button className="logout-button-admin" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <AdminTools />
      </div>
    </div>
  );
};

export default AdminPannel;
