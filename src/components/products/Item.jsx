import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCarrito } from "../../context/CarritoContext";

/**
 * Componente Item
 * Renderiza la tarjeta de un manga con foto, precio, categorías, favoritos y compra directa.
 * Estilizado completamente con Tailwind CSS.
 */
const Item = ({ id, nombre, precio, descripcion, imagen, categoria, stock = 10 }) => {
  const { agregarACarrito } = useCarrito();
  const [esFavorito, setEsFavorito] = useState(false);
  const [mensajeNotif, setMensajeNotif] = useState("");

  // Recorta textos extensos para conservar la armonía visual de las cards
  const recortarTexto = (texto, limite = 85) => {
    if (!texto) return "";
    return texto.length <= limite ? texto : texto.substring(0, limite) + "...";
  };

  const toggleFavorito = (e) => {
    e.preventDefault();
    setEsFavorito((prev) => !prev);
  };

  // Maneja la acción de agregar al contexto global del carrito
  const handleAgregar = (cantidad) => {
    agregarACarrito({
      producto: { id, nombre, precio: Number(precio), imagen, categoria, stock },
      cantidad,
    });

    const texto =
      cantidad === 1
        ? `Se agregó 1 unidad de "${nombre}" al carrito`
        : `Se agregaron ${cantidad} unidades de "${nombre}" al carrito`;

    setMensajeNotif(texto);
    setTimeout(() => setMensajeNotif(""), 2000);
  };

  return (
    <article className="relative bg-white border-2 border-[#BDD9A9] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
      {/* Notificación flotante con Portal */}
      {mensajeNotif &&
        createPortal(
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BDD9A9]/95 text-[#2d2623] px-6 py-4 rounded-2xl font-bold text-sm sm:text-base text-center z-[99999] shadow-2xl backdrop-blur-sm border-2 border-white max-w-sm">
            {mensajeNotif}
          </div>,
          document.body
        )}

      {/* Botón de Favorito flotante */}
      <button
        onClick={toggleFavorito}
        title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-lg hover:scale-110 transition-transform"
      >
        <span>{esFavorito ? "❤️" : "🤍"}</span>
      </button>

      {/* Imagen del manga con enlace al detalle */}
      <Link
        to={`/producto/${id}`}
        className="block bg-stone-100 overflow-hidden aspect-[3/4] flex items-center justify-center"
      >
        <img
          src={imagen || "https://via.placeholder.com/300x400?text=Sin+Imagen"}
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x400?text=YuukiMangas";
          }}
        />
      </Link>

      {/* Cuerpo y datos de la tarjeta */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Categoría / Etiqueta */}
        {categoria && (
          <span className="self-start text-[11px] font-bold text-[#A66946] bg-[#F2C5BB]/60 px-2 py-0.5 rounded-md mb-2">
            {categoria}
          </span>
        )}

        {/* Título */}
        <Link to={`/producto/${id}`} className="hover:underline">
          <h3 className="font-bold text-[#2d2623] text-base line-clamp-1 mb-1">
            {nombre}
          </h3>
        </Link>

        {/* Descripción breve */}
        <p className="text-stone-500 text-xs min-h-[2.5rem] mb-3 leading-relaxed">
          {recortarTexto(descripcion)}
        </p>

        {/* Precio destacado */}
        <p className="text-xl font-black text-[#A66946] mb-3">
          ${Number(precio).toLocaleString()}
        </p>

        {/* Enlace para ver detalle */}
        <Link
          to={`/producto/${id}`}
          className="text-center text-xs font-bold text-[#A66946] hover:text-[#8e5737] hover:underline mb-3"
        >
          Ver sinopsis completa →
        </Link>

        {/* Contador y botón de compra */}
        <ItemCount stock={stock} inicial={1} onAdd={handleAgregar} />
      </div>
    </article>
  );
};

export default Item;
