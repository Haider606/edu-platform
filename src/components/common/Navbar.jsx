import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#2563eb",
        color: "white",
      }}
    >
      <h2>Edu Platform</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/courses" style={{ color: "white" }}>Courses</Link>
        <Link to="/about" style={{ color: "white" }}>About</Link>
        <Link to="/contact" style={{ color: "white" }}>Contact</Link>
      </div>
    </nav>
  );
}