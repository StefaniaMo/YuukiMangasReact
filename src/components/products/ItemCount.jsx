import { useState } from "react";
import styles from "./TarjetaProducto.module.css";

const ItemCount = ({ stock = 10, inicial = 1, onAdd }) => {
  const [contador, setContador] = useState(inicial);

  const incrementar = () => {
    if (contador < stock) setContador(contador + 1);
  };

  const decrementar = () => {
    if (contador > 1) setContador(contador - 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.8rem",
          backgroundColor: "#F2E8C9",
          padding: "0.3rem 0.6rem",
          borderRadius: "6px",
        }}
      >
        <button
          onClick={decrementar}
          style={{
            border: "none",
            backgroundColor: "#A66946",
            color: "white",
            fontWeight: "bold",
            borderRadius: "4px",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        >
          -
        </button>

        <span style={{ fontWeight: "bold", color: "#2d2623" }}>{contador}</span>

        <button
          onClick={incrementar}
          style={{
            border: "none",
            backgroundColor: "#A66946",
            color: "white",
            fontWeight: "bold",
            borderRadius: "4px",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={() => onAdd && onAdd(contador)}
        className={styles["card-button"]}
      >
        Agregar al Carrito 🛒
      </button>
    </div>
  );
};

export default ItemCount;
