import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import { db } from "../firebaseConfig";
import { firebaseConfig } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

interface Product {
  id?: string;
  title: string;
  description: string;
  vendor: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Props {
  product?: Product;
}

const AddProduct = ({ product }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const vendorRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      setIsEditing(true);
      console.log(product);
      if (titleRef.current) titleRef.current.value = product.title;
      if (descriptionRef.current)
        descriptionRef.current.value = product.description;
      if (vendorRef.current) vendorRef.current.value = product.vendor;
      if (categoryRef.current) categoryRef.current.value = product.category;
      if (priceRef.current) priceRef.current.value = product.price.toString();
      if (quantityRef.current)
        quantityRef.current.value = product.quantity.toString();
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

    console.log("editDataHandler");
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
        throw new Error(`HTTP error! status: ${await response.json()}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      alert("Product updated successfully!");
      setIsEditing(false);
      clearInputs();
      navigate("/admin-pannel.local/invetory");
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  const submitDataHandler = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      vendor: vendorRef.current?.value,
      category: categoryRef.current?.value,
      price: priceRef.current?.value,
      quantity: quantityRef.current?.value,
      imageUrl: imageUrlRef.current?.value,
    };
    try {
      const docRef = await addDoc(collection(db, "products-list"), data);
      console.log("Document written with ID: ", docRef.id);
      alert("Data added successfully!");
      clearInputs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="middle-section">
        <div className="form-container">
          <div className="form-container-wrapper">
            <form onSubmit={isEditing ? editDataHandler : submitDataHandler}>
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
              <button type="submit">
                {isEditing ? "Update Product" : "Add to Database"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
