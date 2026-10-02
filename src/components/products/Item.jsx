import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styles from "./TarjetaProducto.module.css";
import ItemCount from "./ItemCount";

const Item = ({ id, nombre, precio, descripcion, imagen }) => {
  const [esFavorito, setEsFavorito] = useState(false);
  const [mensajeNotif, setMensajeNotif] = useState("");

  const recortarTexto = (texto, limite = 90) => {
    if (!texto) return "";
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + "...";
  };

  const toggleFavorito = (e) => {
    e.preventDefault();
    setEsFavorito((prev) => !prev);
  };

  const handleAgregar = (cantidad) => {
    const textoMensaje =
      cantidad === 1
        ? `Se agregó 1 manga de "${nombre}" a tu carrito`
        : `Se agregaron ${cantidad} mangas de "${nombre}" a tu carrito`;

    setMensajeNotif(textoMensaje);

    setTimeout(() => {
      setMensajeNotif("");
    }, 1500);
  };

  return (
    <div className={styles.card} style={{ position: "relative" }}>
      {/* Portal para forzar el centrado en la PANTALLA (no en la card) */}
      {mensajeNotif &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(189, 217, 169, 0.92)", // Verde clarito semi-transparente
              color: "#2d2623",
              padding: "1.2rem 2.2rem",
              borderRadius: "16px",
              fontSize: "1.05rem",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 99999,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(6px)", // Efecto de cristal esmerilado
              border: "2px solid rgba(255, 255, 255, 0.6)",
              maxWidth: "90vw",
              width: "max-content",
            }}
          >
            {mensajeNotif}
          </div>,
          document.body,
        )}

      {/* Botón de Favorito */}
      <button
        onClick={toggleFavorito}
        title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1.2rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          zIndex: 10,
        }}
      >
        <span style={{ color: esFavorito ? "#e63946" : "#ccc" }}>
          {esFavorito ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Imagen del manga */}
      <Link to={`/producto/${id}`}>
        <img src={imagen} alt={nombre} className={styles["card-image"]} />
      </Link>

      <div className={styles["card-content"]}>
        {/* Título */}
        <Link to={`/producto/${id}`} style={{ textDecoration: "none" }}>
          <h3 className={styles["card-title"]}>{nombre}</h3>
        </Link>

        {/* Descripción recortada */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "#555",
            marginBottom: "0.8rem",
            minHeight: "2.8rem",
          }}
        >
          {recortarTexto(descripcion)}
        </p>

        <p className={styles["card-price"]}>${precio}</p>

        {/* Link al detalle completo */}
        <Link
          to={`/producto/${id}`}
          style={{
            display: "block",
            backgroundColor: "#A66946",
            color: "#FFFFFF",
            textAlign: "center",
            padding: "0.4rem",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: "bold",
            marginBottom: "0.8rem",
            textDecoration: "none",
          }}
        >
          Ver detalle completo →
        </Link>

        {/* Contador de unidades */}
        <ItemCount stock={10} inicial={1} onAdd={handleAgregar} />
      </div>
    </div>
  );
};

export default Item;
