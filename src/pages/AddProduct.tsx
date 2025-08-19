import type { FormEvent } from "react";
import { useRef } from "react";
import "./AddProduct.css";
import { db } from "../firebaseConfig"; // adjust path
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
      console.log("Document written with ID: ", docRef);
      alert("data added");
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
              <br></br>
              <input type="text" ref={titleRef} />
              <br></br>
              <label>Description</label>
              <br></br>
              <input type="text" ref={descriptionRef} />
              <br></br>
              <label>Vendor</label>
              <br></br>
              <input type="text" ref={vendorRef} />
              <br></br>
              <label>Category</label>
              <br></br>
              <input type="text" ref={categoryRef} />
              <br></br>
              <label>Price</label>
              <br></br>
              <input type="number" ref={priceRef} />
              <br></br>
              <label>Quantity</label>
              <br></br>
              <input type="number" ref={quantityRef} />
              <br></br>
              <label>Image URL</label>
              <br></br>
              <input type="url" ref={imageUrlRef} />
              <br></br>
              <button type="submit">Add to database</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
