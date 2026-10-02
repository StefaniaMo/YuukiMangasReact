import Item from "./Item";

const ItemList = ({ productos }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {productos.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          nombre={prod.nombre}
          precio={prod.precio}
          descripcion={prod.descripcion}
          imagen={prod.imagen}
        />
      ))}
    </div>
  );
};

export default ItemList;
