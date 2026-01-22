import { useState } from "react";
import { signup } from "../services/api";
import "./Signup.css";

export default function Signup({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await signup({ email, password });
      alert("Signup successful");
      goLogin();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="auth-bg">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-tabs">
          <button type="button" onClick={goLogin}>
            Login
          </button>
          <button className="active">Sign Up</button>
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

          <button className="auth-btn">Create Account</button>
        </div>
        <p className="auth-link">
          Already have an account? <span onClick={goLogin}>Login →</span>
        </p>
      </form>
    </div>
  );
}
