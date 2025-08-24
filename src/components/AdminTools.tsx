import "./AdminTools.css";
import { useNavigate } from "react-router-dom";
const AdminTools = () => {
  const navigate = useNavigate();
  const addProductPageNavigator = () => {
    navigate("/add-product");
  };
  return (
    <>
      <div className="admin-pannel">
        <div className="pannel-menu-wrapper">
          <div className="add-product-tab" onClick={addProductPageNavigator}>
            add product
          </div>
          <div
            className="product-list-tab"
            onClick={() => {
              navigate("/invetory");
            }}
          >
            inventory
          </div>
          <div
            className="orders-tab"
            onClick={() => {
              navigate("/orders");
            }}
          >
            oders
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTools;























































// import AdminPannel from "./AdminPannel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminPannel.css";
// import AdminHome from "./AddProduct";
// import AdminTools from "../components/AdminTools";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
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
          onClick={() => {
            setActiveTab("admin-tools");
            navigate("/");
          }}
        >
          Admin-Tools
        </div>
        <div className="orders-page">
          <h1>Orders</h1>
          <p>Here you can manage and view all orders.</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;

// const Orders = () => {
//   return (
//     <>
//       <AdminPannel />

//     </>
//   );
// };

// export default Orders;
