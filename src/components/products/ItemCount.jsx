import { useState } from "react";
/**
 * Componente ItemCount
 * Selector interactivo de cantidad (+ / -) y botón para agregar al carrito.
 * Estilizado completamente con Tailwind CSS.
 */
const ItemCount = ({ stock = 10, inicial = 1, onAdd }) => {
  const [contador, setContador] = useState(inicial);

  const incrementar = () => {
    if (contador < stock) setContador((prev) => prev + 1);
  };

  const decrementar = () => {
    if (contador > 1) setContador((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-2 mt-auto">
      {/* Controles de incremento y decremento */}
      <div className="flex items-center justify-center gap-3 bg-[#F2E8C9] py-1 px-3 rounded-lg border border-[#A66946]/20">
        <button
          type="button"
          onClick={decrementar}
          disabled={contador <= 1}
          aria-label="Disminuir cantidad"
          className="w-7 h-7 bg-[#A66946] hover:bg-[#8e5737] disabled:opacity-50 text-white font-bold rounded flex items-center justify-center transition-colors text-base"
        >
          -
        </button>

        <span className="font-bold text-[#2d2623] min-w-[24px] text-center text-sm">
          {contador}
        </span>

        <button
          type="button"
          onClick={incrementar}
          disabled={contador >= stock}
          aria-label="Aumentar cantidad"
          className="w-7 h-7 bg-[#A66946] hover:bg-[#8e5737] disabled:opacity-50 text-white font-bold rounded flex items-center justify-center transition-colors text-base"
        >
          +
        </button>
      </div>

      {/* Botón principal de compra */}
      <button
        type="button"
        onClick={() => onAdd && onAdd(contador)}
        disabled={stock <= 0}
        className="w-full py-2 px-3 bg-[#A66946] hover:bg-[#8e5737] disabled:bg-stone-300 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
      >
        <span>🛒</span>
        <span>{stock > 0 ? "Agregar al Carrito" : "Sin Stock"}</span>
      </button>
    </div>
  );
};

export default ItemCount;
