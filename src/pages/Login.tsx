import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";
import "./AdminSignup.css";

const API_KEY = firebaseConfig.apiKey;
// const projectId = firebaseConfig.projectId;
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
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
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ email, password, returnSecureToken: true }),
          }
        );
      }
      alert("admin Login success");
      navigate("/admin-pannel.local")
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
          <a href="/signup">signup?</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
