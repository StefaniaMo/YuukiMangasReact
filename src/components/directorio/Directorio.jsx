import { useState, useEffect } from "react";
import TarjetaContacto from "./TarjetaContacto";

const Directorio = () => {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición al archivo JSON local
    fetch("datos/nosotros.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información del equipo.");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setNosotros(datos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return (
    <section className="w-full py-10 px-4 bg-[#FAFAF7] border-t-2 border-dashed border-[#BDD9A9]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[#A66946] text-2xl font-black mb-8 tracking-tight">
          👥 Nuestro Equipo de YuukiMangas
        </h2>
        {/* 1. Renderizado condicional: Cargando */}
        {cargando && (
          <div className="text-center py-8 text-[#A66946] font-semibold text-base">
            ⏳ Cargando equipo...
          </div>
        )}
        {/* 2. Renderizado condicional: Error */}
        {error && (
          <div className="text-center py-4 px-6 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto text-sm">
            ⚠️ Ocurrió un error: {error}
          </div>
        )}
        {/* 3. Renderizado de Tarjetas en Grilla */}
        {!cargando && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {nosotros.map((persona) => (
              <TarjetaContacto key={persona.id} persona={persona} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Directorio;
