import { useState, useContext, createContext } from "react";

export const CarritoContext = createContext();

// Custom Hook
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarACarrito = ({ producto, cantidad = 1 }) => {
    const itemEnCarrito = carrito.find((item) => item.id === producto.id);

    if (itemEnCarrito) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito((prev) => [...prev, { ...producto, cantidad }]);
    }
  };

  // Eliminar producto por ID
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Incrementar cantidad en 1
  const incrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Decrementar cantidad en 1 (si llega a 0, se elimina)
  const decrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Vaciar carrito por completo
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Total de unidades de productos en el carrito
  const itemsEnCarrito = () => {
    return carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
  };

  // Precio total acumulado
  const cobroTotal = () => {
    return carrito.reduce(
      (acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0),
      0
    );
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarACarrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        itemsEnCarrito,
        cobroTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
