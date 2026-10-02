import styles from "./TarjetaProducto.module.css";

const TarjetaProducto = ({ imagen, nombre, precio }) => {
  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles["card-image"]} />
      <div className={styles["card-content"]}>
        <h3 className={styles["card-title"]}>{nombre}</h3>
        <p className={styles["card-price"]}>${precio}</p>
        <button className={styles["card-button"]}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default TarjetaProducto;
