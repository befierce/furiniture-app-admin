import { useState } from "react";
import { firebaseConfig } from "../firebaseConfig";
import "./AdminSignup.css";

const API_KEY = firebaseConfig.apiKey;
const projectId = firebaseConfig.projectId;
const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const email = formData.email;
    const password = formData.password;
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );
      const data = await res.json();
      const idToken = data.idToken;

      if (data && data.localId) {
        await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/admins?documentId=${data.localId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              fields: {
                name: { stringValue: formData.name },
                email: { stringValue: formData.email },
                role: { stringValue: "admin" },
              },
            }),
          }
        );
      }
      alert("admin created successfully")
    } catch (err) {
      console.log(err);
      alert(err);
    }
    // console.log("Admin data submitted:", formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Admin Signup</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Admin Name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />

          <button type="submit">Signup</button>
          <a href="/login">login?</a>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
