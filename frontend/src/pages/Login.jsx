import { useState } from "react";
import { login } from "../services/api";
import "./Signup.css";
import Loader from "../components/Loader";
export default function Login({ goSignup, goDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      alert("Login Successful");
      goDashboard();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="auth-bg">
        <form className="auth-card" onSubmit={submit}>
          <div className="auth-tabs">
            <button type="button" className="active">
              Login
            </button>{" "}
            <button type="button" onClick={goSignup}>
              Sign Up
            </button>
          </div>

          <div className="space-y-4">
            <input
              className="auth-input"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="auth-link">
            Don’t have an account? <span onClick={goSignup}>Sign Up →</span>
          </p>
        </form>
      </div>
    </>
  );
}
