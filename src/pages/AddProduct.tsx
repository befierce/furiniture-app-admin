import type { FormEvent } from "react";
import { useRef } from "react";
import "./AddProduct.css";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddProduct = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const vendorRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const clearInputs = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (vendorRef.current) vendorRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "";
    if (priceRef.current) priceRef.current.value = "";
    if (quantityRef.current) quantityRef.current.value = "";
    if (imageUrlRef.current) imageUrlRef.current.value = "";
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
            <form onSubmit={submitDataHandler}>
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
                "Add to Database"
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
