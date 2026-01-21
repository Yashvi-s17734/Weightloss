import "./Button.css";

export default function Button({ children, type = "submit" }) {
  return (
    <button type={type} className="btn">
      {children}
    </button>
  );
}
