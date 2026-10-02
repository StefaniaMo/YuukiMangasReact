import { useState } from "react";
import { createPortal } from "react-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ producto }) => {
  const [mensajeNotif, setMensajeNotif] = useState("");

  const handleAgregar = (cantidad) => {
    const textoMensaje =
      cantidad === 1
        ? `Se agregó 1 manga de "${producto.nombre}" a tu carrito`
        : `Se agregaron ${cantidad} mangas de "${producto.nombre}" a tu carrito`;

    setMensajeNotif(textoMensaje);

    setTimeout(() => {
      setMensajeNotif("");
    }, 1500);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "2px solid #BDD9A9",
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
        position: "relative",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Portal Centrado en Pantalla */}
      {mensajeNotif &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(189, 217, 169, 0.92)",
              color: "#2d2623",
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)", // Crece entre 1rem (móvil) y 1.4rem (pantalla grande)
              padding: "clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 3vw, 3rem)", // El relleno también escala de forma fluida
              borderRadius: "16px",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 99999,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(6px)",
              border: "2px solid rgba(255, 255, 255, 0.6)",
              maxWidth: "90vw",
              width: "max-content",
            }}
          >
            {mensajeNotif}
          </div>,
          document.body,
        )}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "contain",
          borderRadius: "8px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2
          style={{ color: "#A66946", fontSize: "2rem", marginBottom: "0.5rem" }}
        >
          {producto.nombre}
        </h2>
        <span
          style={{
            backgroundColor: "#F2C5BB",
            color: "#A66946",
            padding: "0.2rem 0.6rem",
            borderRadius: "4px",
            width: "fit-content",
            fontSize: "0.85rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {producto.categoria}
        </span>
        <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          {producto.descripcion}
        </p>
        <p
          style={{
            fontSize: "1.8rem",
            fontWeight: "800",
            color: "#2d2623",
            marginBottom: "1.5rem",
          }}
        >
          ${producto.precio}
        </p>

        <ItemCount stock={10} inicial={1} onAdd={handleAgregar} />
      </div>
    </div>
  );
};

export default ItemDetail;
