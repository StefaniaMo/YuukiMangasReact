import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      {/* Enlaces para pantallas grandes (Desktop) */}
      <div
        className="navbar-desktop"
        style={{ display: "flex", gap: "1.5rem" }}
      >
        <Link
          to="/"
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Inicio
        </Link>
        <Link
          to="/productos"
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Productos
        </Link>
        <Link
          to="/contacto"
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Contacto
        </Link>
        <Link
          to="/carrito"
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Carrito 🛒
        </Link>
      </div>

      {/* Botón Hamburguesa para Mobile y Tablet */}
      <button
        className="hamburger-btn"
        onClick={toggleMenu}
        aria-label="Abrir menú"
        style={{
          background: "none",
          border: "none",
          fontSize: "1.8rem",
          color: "#A66946",
          cursor: "pointer",
          padding: "0.2rem 0.5rem",
          zIndex: 1001,
        }}
      >
        {menuAbierto ? "✕" : "☰"}
      </button>

      {/* Fondo oscuro al abrir el menú (Overlay) */}
      {menuAbierto && (
        <div
          onClick={cerrarMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        />
      )}

      {/* Panel Desplegable Lateral a la Derecha */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: menuAbierto ? 0 : "-280px",
          width: "260px",
          height: "100vh",
          backgroundColor: "#F2E8C9",
          borderLeft: "3px solid #BDD9A9",
          boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1.5rem",
          gap: "1.5rem",
          transition: "right 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: "#A66946", fontSize: "1.2rem" }}
          >
            Menú
          </span>
        </div>

        <Link
          to="/"
          onClick={cerrarMenu}
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Inicio
        </Link>
        <Link
          to="/productos"
          onClick={cerrarMenu}
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Productos
        </Link>
        <Link
          to="/contacto"
          onClick={cerrarMenu}
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Contacto
        </Link>
        <Link
          to="/carrito"
          onClick={cerrarMenu}
          style={{
            color: "#A66946",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          Carrito 🛒
        </Link>
      </aside>
    </>
  );
};

export default Navbar;
