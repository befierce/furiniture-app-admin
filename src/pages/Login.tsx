import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../firebaseConfig";
import "./AdminSignup.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/authSlice";
const API_KEY = firebaseConfig.apiKey;

const Login = () => {
  const dispatch = useDispatch();
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

    const { email, password } = formData;
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        return;
      }

      console.log("Login Success:", data);
      localStorage.setItem("idToken", data.idToken);

      alert("Admin Login Success");
      dispatch(setLogin());
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again!");
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
