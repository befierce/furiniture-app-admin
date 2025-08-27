import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { firebaseConfig } from "../firebaseConfig";
import "./AdminPannel.css";
import "./Orders.css";

interface OrderItem {
  category: string;
  description: string;
  imageUrl: string;
  productId: string;
  title: string;
  price: string;
  quantity: string;
  vendor: string;
  quantityInCart: number;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  items: OrderItem[];
}

const Orders = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/orders`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        if (!data.documents) return;
        console.log("Raw fetched data:", data.documents);
        const formattedOrders: Order[] = data.documents.map((doc: any) => {
          const fields = doc.fields;
          return {
            id: doc.name.split("/").pop(),
            userId: fields.userId?.stringValue || "unknown",
            status: fields.status?.stringValue || "unknown",
            items:
              fields.items?.arrayValue?.values?.map((item: any) => {
                const f = item.mapValue.fields;
                return {
                  productId: f.productId?.stringValue || "",
                  category: f.category?.stringValue || "",
                  vendor: f.vendor?.stringValue || "",
                  title: f.title?.stringValue || "",
                  price: parseInt(f.price?.integerValue || f.price?.stringValue || ""),
                  quantity: parseInt(f.quantity?.integerValue || ""),
                  quantityInCart: parseInt(
                    f.quantityInCart?.integerValue || "0"
                  ),
                };
              }) || [],
          };
        });

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  useEffect(() => {
    console.log("formatted orders", orders);
  }, [orders]);
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/orders/${orderId}?updateMask.fieldPaths=status`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: { status: { stringValue: newStatus } },
        }),
      });
      console.log("response after changing the status", response);
      if (!response.ok) {
        console.error("Failed to update order status", await response.text());
        return;
      }
      // if (newStatus === "completed") {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (newStatus === "completed") {
        const order = orders.find((o) => o.id === orderId);

        if (order) {
          for (const item of order.items) {
            console.log("items or product", item);
            const currentQuantity = parseInt(item.quantity || "0", 10);
            const newQuantity = currentQuantity - item.quantityInCart;

            console.log(
              "Updating product:",
              item.productId,
              "to quantity:",
              newQuantity
            );

            const productUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list/${item.productId}?updateMask.fieldPaths=quantity`;
            console.log(
              "project id:",
              firebaseConfig.projectId,
              "product id:",
              item.productId
            );
            const updateResponse = await fetch(productUrl, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fields: {
                  quantity: { integerValue: newQuantity },
                },
              }),
            });

            if (!updateResponse.ok) {
              console.error(
                `Failed to update product ${item.productId}`,
                await updateResponse.text()
              );
            } else {
              console.log(
                `Product ${item.productId} quantity updated successfully!`
              );
            }
          }
          
        }
        // }
      }
      
    } catch (error) {
      console.error("Error in handleStatusChange:", error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

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

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User ID</th>
                  <th>Status</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity in Cart</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  order.items.map((item, idx) => (
                    <tr key={`${order.id}-${idx}`}>
                      <td>{idx === 0 ? order.id : ""}</td>
                      <td>{idx === 0 ? order.userId : ""}</td>
                      <td>
                        {idx === 0 && (
                          <select
                            className={`status-dropdown ${getStatusClass(
                              order.status
                            )}`}
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        )}
                      </td>
                      <td>{item.productId}</td>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantityInCart}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
