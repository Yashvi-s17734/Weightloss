import { useState } from "react";
import { login } from "../services/api";
import "./Signup.css";

export default function Login({ goSignup, goDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      goDashboard();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={submit}>
        {/* Tabs */}
        <div className="auth-tabs">
          <button className="active">Login</button>
          <button type="button" onClick={goSignup}>
            Sign Up
          </button>
        </div>

        <div className="space-y-4">
          <input
            className="auth-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">Login</button>
        </div>
        <p className="auth-link">
          Don’t have an account? <span onClick={goSignup}>Sign Up →</span>
        </p>
      </form>
    </div>
  );
}
