import { useState } from "react";
import "./AdminPannel.css";
// import AdminHome from "./AddProduct";
import AdminTools from "../components/AdminTools";

const AdminPannel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
          className={`tab ${activeTab === "admin-tools" ? "active" : ""}`}
          onClick={() => setActiveTab("admin-tools")}
        >
          Admin-Tools
        </div>
        <div
          className={`tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </div>
        <div
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </div>
      </div>
      <div className="browser-content">
        {activeTab === "admin-tools" && (
          <>
            <AdminTools/>
          </>
        )}
        {activeTab === "orders" && (
          <>
            <h1>User Management</h1>
            <p>Here you can manage users, roles, and permissions.</p>
          </>
        )}
        {activeTab === "settings" && (
          <>
            <h1>Settings</h1>
            <p>Configure your application settings here.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPannel;
