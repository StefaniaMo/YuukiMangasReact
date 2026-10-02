import { useState, useEffect } from "react";
import TarjetaContacto from "./TarjetaContacto";

const Directorio = () => {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición al archivo JSON local
    fetch("/datos/nosotros.json")
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
    <section
      style={{
        width: "100%",
        padding: "2.5rem 1rem",
        backgroundColor: "#FAFAF7",
        borderTop: "2px dashed #BDD9A9",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#A66946",
            marginBottom: "1.8rem",
            fontSize: "1.8rem",
          }}
        >
          👥 Nuestro Equipo
        </h2>

        {/* 1. Renderizado condicional: Cargando */}
        {cargando && (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "#A66946",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            ⏳ Cargando equipo de MangaYuuki...
          </div>
        )}

        {/* 2. Renderizado condicional: Error */}
        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              backgroundColor: "#FFD1D1",
              color: "#D8000C",
              borderRadius: "8px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            ⚠️ Ops! Ocurrió un error: {error}
          </div>
        )}

        {/* 3. Renderizado de Tarjetas en Grilla */}
        {!cargando && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
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
