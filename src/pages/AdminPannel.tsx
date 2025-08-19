import { useState } from "react";
import "./AdminPannel.css";

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
          className={`tab ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Admin Dashboard
        </div>
        <div
          className={`tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </div>
        <div
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </div>
      </div>
      <div className="browser-content">
        {activeTab === "dashboard" && (
          <>
            <h1>Welcome to Admin Dashboard</h1>
            <p>Manage your application overview here.</p>
          </>
        )}
        {activeTab === "users" && (
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
