import { useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCarrito } from "../context/CarritoContext";

/**
 * Página Carrito
 * Muestra los mangas agregados, controles de cantidad (+ / -), eliminar ítem,
 * sección para ingresar cupón de descuento (validado contra Firestore 'cupones')
 * y el resumen con subtotal, descuento y total final.
 * Estilizado completamente con Tailwind CSS.
 */
const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    cobroTotal,
    itemsEnCarrito,
  } = useCarrito();

  const [codigoInput, setCodigoInput] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [mensajeCupon, setMensajeCupon] = useState({ tipo: "", texto: "" });
  const [validandoCupon, setValidandoCupon] = useState(false);

  const subtotal = cobroTotal();
  const descuentoPorcentaje = cuponAplicado ? Number(cuponAplicado.descuento) : 0;
  const montoDescuento = (subtotal * descuentoPorcentaje) / 100;
  const totalFinal = Math.max(0, subtotal - montoDescuento);

  const aplicarCupon = async (e) => {
    e.preventDefault();
    const codigoLimpio = codigoInput.trim().toUpperCase();

    if (!codigoLimpio) {
      setMensajeCupon({ tipo: "error", texto: "Ingresa un código de cupón." });
      return;
    }

    setValidandoCupon(true);
    setMensajeCupon({ tipo: "", texto: "" });

    try {
      const q = query(
        collection(db, "cupones"),
        where("codigo", "==", codigoLimpio)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setCuponAplicado(null);
        setMensajeCupon({
          tipo: "error",
          texto: `El cupón "${codigoLimpio}" no existe o no es válido.`,
        });
      } else {
        const datosCupon = snap.docs[0].data();
        setCuponAplicado({ id: snap.docs[0].id, ...datosCupon });
        setMensajeCupon({
          tipo: "exito",
          texto: `¡Cupón "${datosCupon.codigo}" aplicado! (-${datosCupon.descuento}%)`,
        });
      }
    } catch (err) {
      console.error("Error al validar cupón:", err);
      setMensajeCupon({
        tipo: "error",
        texto: "Error al verificar el cupón. Intenta nuevamente.",
      });
    } finally {
      setValidandoCupon(false);
    }
  };

  const quitarCupon = () => {
    setCuponAplicado(null);
    setCodigoInput("");
    setMensajeCupon({ tipo: "", texto: "" });
  };

  if (carrito.length === 0) {
    return (
      <section className="py-16 px-4 text-center max-w-lg mx-auto">
        <div className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-8 shadow-sm">
          <p className="text-4xl mb-3">🛒</p>
          <h1 className="text-2xl font-black text-[#A66946] mb-2">
            El carrito está vacío
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            Agrega algunos mangas del catálogo para comenzar tu compra.
          </p>
          <Link
            to="/productos"
            className="inline-block px-6 py-2.5 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded-xl text-sm shadow transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b-2 border-[#BDD9A9] gap-3">
        <h1 className="text-2xl sm:text-3xl font-black text-[#A66946]">
          🛒 Carrito de Compras ({itemsEnCarrito()})
        </h1>
        <button
          type="button"
          onClick={vaciarCarrito}
          className="self-start sm:self-auto px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          Vaciar Carrito
        </button>
      </div>

      {/* Listado de productos en el carrito */}
      <div className="flex flex-col gap-4 mb-6">
        {carrito.map((item) => (
          <article
            key={item.id}
            className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm"
          >
            <img
              src={
                item.imagen ||
                item.image ||
                "https://via.placeholder.com/80x110?text=Manga"
              }
              alt={item.nombre}
              className="w-20 h-28 object-cover rounded-lg border border-stone-200 shrink-0"
            />

            <div className="flex-grow text-center sm:text-left">
              <Link
                to={`/producto/${item.id}`}
                className="font-bold text-[#2d2623] text-base hover:text-[#A66946] transition-colors"
              >
                {item.nombre}
              </Link>
              <p className="text-xs text-stone-500 mt-1">
                Precio unitario:{" "}
                <strong className="text-stone-700">
                  ${Number(item.precio).toLocaleString()}
                </strong>
              </p>
              <p className="text-sm font-black text-[#A66946] mt-1">
                Subtotal: ${(Number(item.precio) * item.cantidad).toLocaleString()}
              </p>
            </div>

            {/* Controles de cantidad (+ / -) */}
            <div className="flex items-center gap-2 bg-[#F2E8C9] px-3 py-1.5 rounded-xl border border-[#A66946]/20">
              <button
                type="button"
                onClick={() => decrementarCantidad(item.id)}
                aria-label="Disminuir cantidad"
                className="w-7 h-7 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded flex items-center justify-center transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="font-bold text-[#2d2623] min-w-[24px] text-center text-sm">
                {item.cantidad}
              </span>
              <button
                type="button"
                onClick={() => incrementarCantidad(item.id)}
                aria-label="Aumentar cantidad"
                className="w-7 h-7 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded flex items-center justify-center transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Botón eliminar producto */}
            <button
              type="button"
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
              aria-label={`Eliminar ${item.nombre}`}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </article>
        ))}
      </div>

      {/* Sección Ingresar Cupón */}
      <div className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h2 className="text-sm font-black text-[#A66946] uppercase tracking-wide">
            🎟️ Ingresar cupón de descuento
          </h2>
          <Link
            to="/cupones"
            className="text-xs font-bold text-[#A66946] hover:underline"
          >
            Ver cupones disponibles →
          </Link>
        </div>

        <form onSubmit={aplicarCupon} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Pega o escribe tu código (ej: YUUKI10)"
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
            disabled={validandoCupon}
            className="flex-grow px-3 py-2 border border-stone-300 rounded-xl text-sm font-mono uppercase focus:outline-none focus:border-[#A66946]"
          />
          <button
            type="submit"
            disabled={validandoCupon}
            className="px-5 py-2 bg-[#A66946] hover:bg-[#8e5737] disabled:bg-stone-300 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            {validandoCupon ? "Validando..." : "Aplicar"}
          </button>
          {cuponAplicado && (
            <button
              type="button"
              onClick={quitarCupon}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Quitar
            </button>
          )}
        </form>

        {mensajeCupon.texto && (
          <p
            className={`mt-2 text-xs font-bold ${
              mensajeCupon.tipo === "exito" ? "text-green-700" : "text-red-600"
            }`}
          >
            {mensajeCupon.texto}
          </p>
        )}
      </div>

      {/* Resumen final con Subtotal, Descuento y Total */}
      <div className="bg-[#F2E8C9] border-2 border-[#BDD9A9] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="w-full sm:w-auto space-y-1">
          <div className="flex items-center justify-between sm:justify-start gap-4 text-sm text-stone-600">
            <span>Subtotal:</span>
            <strong className="text-stone-800">
              ${subtotal.toLocaleString()}
            </strong>
          </div>

          {cuponAplicado && (
            <div className="flex items-center justify-between sm:justify-start gap-4 text-sm text-green-700 font-semibold">
              <span>Descuento ({cuponAplicado.descuento}%):</span>
              <span>-${montoDescuento.toLocaleString()}</span>
            </div>
          )}

          <div className="pt-1 border-t border-[#A66946]/20 flex items-center justify-between sm:justify-start gap-4">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wide">
              Total final:
            </span>
            <span className="text-3xl font-black text-[#A66946]">
              ${totalFinal.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            alert("¡Gracias por tu compra en YuukiMangas! Pedido confirmado.")
          }
          className="w-full sm:w-auto px-8 py-3 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
        >
          Finalizar Compra
        </button>
      </div>
    </section>
  );
};

export default Carrito;
