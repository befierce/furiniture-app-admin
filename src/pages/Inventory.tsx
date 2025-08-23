import { useEffect, useState } from "react";
import { firebaseConfig } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  vendor: string;
  imageUrl: string;
  quantity: number;
}

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const handleDelete = async (product: Product) => {
    console.log("Deleting:", product);
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list/${product.id}`;

    const response = await fetch(url, { method: "DELETE" });

    if (response.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      console.log("Deleted product with id", product.id);
    } else {
      console.error("Failed to delete", await response.text());
    }
  };

  const handleEdit = (product: Product) => {
    navigate("/admin-pannel.local/edit-product", { state: { product } });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("array of products before", data.documents);

      if (data.documents) {
        const productList: Product[] = data.documents.map((doc: any) => {
          const fields = doc.fields;
          const id = doc.name.split("/").pop();
          return {
            id: id || "",
            title: fields.title?.stringValue || "",
            description: fields.description?.stringValue || "",
            category: fields.category?.stringValue || "",
            price: Number(
              fields.price?.integerValue || fields.price?.stringValue || "0"
            ),
            quantity: Number(
              fields.quantity?.integerValue ||
                fields.quantity?.stringValue ||
                "0"
            ),
            imageUrl: fields.imageUrl?.stringValue || "",
            vendor: fields.vendor?.stringValue || "",
          };
        });

        setProducts(productList);
        console.log("array of products after", productList);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* {selectedProduct && <AddProduct product={selectedProduct} />} */}
      <div className="inventory-container">
        <h2 className="header">Products List</h2>
        <div className="product-list-wrapper-outer">
          {products.map((product) => (
            <div className="product-list-item" key={product.id}>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="desc">{product.description}</p>
                <p>
                  ₹{product.price} | Qty: {product.quantity}
                </p>
              </div>
              <div className="product-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
