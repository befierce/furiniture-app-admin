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
        <AdminTools />
      </div>
    </div>
  );
};

export default AdminPannel;
