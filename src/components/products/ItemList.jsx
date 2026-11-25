import Item from "./Item";

/**
 * Componente ItemList
 * Grilla responsiva que itera la lista de productos y renderiza cada <Item />
 * Estilizado completamente con Tailwind CSS.
 */
const ItemList = ({ productos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((prod) => (
        <Item
          key={prod.id}
          id={prod.id}
          nombre={prod.nombre}
          precio={prod.precio}
          descripcion={prod.descripcion}
          imagen={prod.imagen}
          categoria={prod.categoria}
          stock={prod.stock ?? 10}
        />
      ))}
    </div>
  );
};

export default ItemList;
