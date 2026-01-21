import "./Navbar.css";

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Weight Tracker</h1>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
}
