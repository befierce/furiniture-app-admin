import type { FormEvent } from "react";
import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddProduct.css";
import { firebaseConfig } from "../firebaseConfig";

const EditProduct = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const vendorRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  useEffect(() => {
    if (product) {
      if (titleRef.current) titleRef.current.value = product.title;
      if (descriptionRef.current) descriptionRef.current.value = product.description;
      if (vendorRef.current) vendorRef.current.value = product.vendor;
      if (categoryRef.current) categoryRef.current.value = product.category;
      if (priceRef.current) priceRef.current.value = product.price.toString();
      if (quantityRef.current) quantityRef.current.value = product.quantity.toString();
      if (imageUrlRef.current) imageUrlRef.current.value = product.imageUrl;
    }
  }, [product]);

  const clearInputs = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (vendorRef.current) vendorRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
    if (quantityRef.current) quantityRef.current.value = "";
    if (imageUrlRef.current) imageUrlRef.current.value = "";
  };

  const editDataHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!product || !product.id) {
      console.error("No product ID found for update");
      return;
    }

    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/products-list/${product.id}`;

    const updatedData = {
      fields: {
        title: { stringValue: titleRef.current?.value || "" },
        description: { stringValue: descriptionRef.current?.value || "" },
        vendor: { stringValue: vendorRef.current?.value || "" },
        category: { stringValue: categoryRef.current?.value || "" },
        price: { integerValue: parseInt(priceRef.current?.value || "0") },
        quantity: { integerValue: parseInt(quantityRef.current?.value || "0") },
        imageUrl: { stringValue: imageUrlRef.current?.value || "" },
      },
    };

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      alert("Product updated successfully!");
      clearInputs();
      navigate("/admin-pannel.local/invetory");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="middle-section">
      <div className="form-container">
        <div className="form-container-wrapper">
          <form onSubmit={editDataHandler}>
            <label>Title</label>
            <br />
            <input type="text" ref={titleRef} required />
            <br />
            <label>Description</label>
            <br />
            <input type="text" ref={descriptionRef} required />
            <br />
            <label>Vendor</label>
            <br />
            <input type="text" ref={vendorRef} required />
            <br />
            <label>Category</label>
            <br />
            <input type="text" ref={categoryRef} required />
            <br />
            <label>Price</label>
            <br />
            <input type="number" ref={priceRef} required min="0" />
            <br />
            <label>Quantity</label>
            <br />
            <input type="number" ref={quantityRef} required min="0" />
            <br />
            <label>Image URL</label>
            <br />
            <input type="url" ref={imageUrlRef} required />
            <br />
            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
