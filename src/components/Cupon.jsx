import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * Componente Cupon
 * Muestra los cupones promocionales activos cargados desde Firestore ('cupones')
 * con un botón para copiar el código directamente al portapapeles.
 * Estilizado completamente con Tailwind CSS.
 */
const Cupon = () => {
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [copiadoId, setCopiadoId] = useState(null);

  useEffect(() => {
    const fetchCupones = async () => {
      try {
        setCargando(true);
        const querySnapshot = await getDocs(collection(db, "cupones"));
        const docs = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setCupones(docs);
      } catch (err) {
        console.error("Error al obtener cupones:", err);
        setError("Ocurrió un error al cargar los cupones.");
      } finally {
        setCargando(false);
      }
    };

    fetchCupones();
  }, []);

  const copiarCodigo = async (id, codigo) => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiadoId(id);
      setTimeout(() => setCopiadoId(null), 2000);
    } catch (err) {
      console.error("No se pudo copiar al portapapeles:", err);
    }
  };

  return (
    <section className="bg-white border-2 border-[#BDD9A9] rounded-2xl p-6 shadow-sm">
      <header className="mb-4 pb-3 border-b border-stone-200 flex items-center justify-between">
        <h2 className="text-xl font-black text-[#A66946]">
          🎟️ Cupones Promocionales
        </h2>
        {!cargando && !error && (
          <span className="px-2.5 py-0.5 bg-[#F2C5BB] text-[#A66946] text-xs font-bold rounded-full">
            {cupones.length}
          </span>
        )}
      </header>

      {/* Estado de Carga */}
      {cargando && (
        <p className="text-sm text-stone-500 py-4 text-center">
          Cargando cupones...
        </p>
      )}

      {/* Mensaje de Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Sin cupones */}
      {!cargando && !error && cupones.length === 0 && (
        <p className="text-sm text-stone-500 py-4 text-center">
          No hay cupones creados en la base de datos.
        </p>
      )}

      {/* Lista de Cupones */}
      {!cargando && !error && cupones.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cupones.map((cupon) => (
            <article
              key={cupon.id}
              className="bg-[#FAFAF7] border-2 border-dashed border-[#A66946]/40 rounded-xl p-4 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#2d2623] text-sm tracking-wider uppercase">
                  {cupon.codigo}
                </span>
                <span className="px-2.5 py-1 bg-[#BDD9A9] text-[#2d2623] text-xs font-black rounded-lg">
                  -{cupon.descuento}%
                </span>
              </div>

              <button
                type="button"
                onClick={() => copiarCodigo(cupon.id, cupon.codigo)}
                className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  copiadoId === cupon.id
                    ? "bg-[#BDD9A9] text-[#2d2623]"
                    : "bg-[#A66946] hover:bg-[#8e5737] text-white"
                }`}
              >
                {copiadoId === cupon.id ? "✓ ¡Código copiado!" : "📋 Copiar código"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cupon;
