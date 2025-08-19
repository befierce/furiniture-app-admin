import "./AdminTools.css";
import { useNavigate } from "react-router-dom";
const AdminTools = () => {
  const navigate = useNavigate();
  const addProductPageNavigator = () => {
    navigate("/admin-pannel.local/add-product")
  };
  return (
    <>
      <div className="admin-pannel">
        <div className="pannel-menu-wrapper">
          <div className="add-product-tab" onClick={addProductPageNavigator}>
            add product
          </div>
          <div className="product-list-tab">product-list</div>
          <div className="orders-tab">oders</div>
        </div>
      </div>
    </>
  );
};

export default AdminTools;
