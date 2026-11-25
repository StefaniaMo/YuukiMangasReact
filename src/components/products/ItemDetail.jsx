import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCarrito } from "../../context/CarritoContext";

/**
 * Componente ItemDetail
 * Presenta la ficha técnica y sinopsis detallada del manga.
 * Estilizado completamente con Tailwind CSS.
 */
const ItemDetail = ({ producto }) => {
  const { agregarACarrito } = useCarrito();
  const [mensajeNotif, setMensajeNotif] = useState("");

  const handleAgregar = (cantidad) => {
    agregarACarrito({
      producto: {
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        imagen: producto.imagen,
        categoria: producto.categoria,
        stock: producto.stock ?? 10,
      },
      cantidad,
    });

    const texto =
      cantidad === 1
        ? `Se agregó 1 unidad de "${producto.nombre}" al carrito`
        : `Se agregaron ${cantidad} unidades de "${producto.nombre}" al carrito`;

    setMensajeNotif(texto);
    setTimeout(() => setMensajeNotif(""), 2000);
  };

  return (
    <article className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm my-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      {/* Notificación flotante vía Portal */}
      {mensajeNotif &&
        createPortal(
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BDD9A9]/95 text-[#2d2623] px-6 py-4 rounded-2xl font-bold text-center z-[99999] shadow-2xl backdrop-blur-sm border-2 border-white max-w-sm">
            {mensajeNotif}
          </div>,
          document.body
        )}

      {/* Portada del manga */}
      <div className="flex items-center justify-center bg-stone-50 rounded-xl p-4 overflow-hidden border border-stone-200">
        <img
          src={producto.imagen || "https://via.placeholder.com/350x500?text=YuukiMangas"}
          alt={producto.nombre}
          className="max-h-[420px] w-auto object-contain rounded-lg shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/350x500?text=YuukiMangas";
          }}
        />
      </div>

      {/* Información detallada */}
      <div className="flex flex-col justify-between">
        <div>
          {/* Categoría */}
          {producto.categoria && (
            <span className="inline-block bg-[#F2C5BB] text-[#A66946] text-xs font-bold px-3 py-1 rounded-full mb-3">
              {producto.categoria}
            </span>
          )}

          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#2d2623] mb-3 leading-snug">
            {producto.nombre}
          </h2>

          {/* Sinopsis */}
          <p className="text-stone-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
            {producto.descripcion || "Sinopsis no disponible en este momento."}
          </p>
        </div>

        <div>
          {/* Precio y Stock */}
          <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs text-stone-500 font-bold block">PRECIO UNITARIO</span>
              <span className="text-3xl font-black text-[#A66946]">
                ${Number(producto.precio).toLocaleString()}
              </span>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              Stock disponible: <strong>{producto.stock ?? 10} unidades</strong>
            </span>
          </div>

          {/* Selector de cantidad y compra */}
          <ItemCount
            stock={producto.stock ?? 10}
            inicial={1}
            onAdd={handleAgregar}
          />

          {/* Enlace para volver */}
          <div className="mt-4 text-center">
            <Link
              to="/productos"
              className="text-xs font-bold text-stone-500 hover:text-[#A66946] transition-colors"
            >
              ← Volver al catálogo de mangas
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ItemDetail;
