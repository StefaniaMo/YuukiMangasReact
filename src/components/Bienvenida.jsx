import { Link } from "react-router-dom";

const Bienvenida = () => {
  // Función para hacer scroll suave hacia el catálogo
  const scrollToProductos = () => {
    const seccionProductos = document.getElementById("catalogo-mangas");
    if (seccionProductos) {
      seccionProductos.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#F2E8C9",
        border: "2px solid #BDD9A9",
        borderRadius: "16px",
        padding: "3rem 1.5rem",
        textAlign: "center",
        marginBottom: "2.5rem",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.2rem",
      }}
    >
      {/* Insignia / Badge decorativa */}
      <span
        style={{
          backgroundColor: "#F2C5BB",
          color: "#A66946",
          padding: "0.4rem 1rem",
          borderRadius: "20px",
          fontSize: "0.9rem",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        Tu tienda de mangas favorita
      </span>

      {/* Título Principal */}
      <h1
        style={{
          color: "#2d2623",
          fontFamily: "'Work Sans', sans-serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: "800",
          margin: 0,
          lineHeight: "1.2",
        }}
      >
        ¡Bienvenidos a <span style={{ color: "#A66946" }}>YuukiMangas</span>!
        📚🌸
      </h1>

      {/* Subtítulo / Descripción */}
      <p
        style={{
          color: "#555",
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          maxWidth: "650px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        El lugar perfecto para fanáticos del manga. Encontrá tus colecciones
        favoritas o dale una segunda vida a tus tomos leídos.
      </p>

      {/* Pregunta interactiva */}
      <p
        style={{
          color: "#2d2623",
          fontSize: "1.15rem",
          fontWeight: "bold",
          marginTop: "0.5rem",
          marginBottom: "0.2rem",
        }}
      >
        ¿Qué te gustaría hacer hoy? 🤔
      </p>

      {/* Botones de Acción */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "0.5rem",
        }}
      >
        {/* Botón Comprar: Scroll suave al catálogo */}
        <button
          onClick={scrollToProductos}
          style={{
            backgroundColor: "#BDD9A9",
            color: "#2d2623",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "10px",
            fontSize: "1.05rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            boxShadow: "0 4px 12px rgba(189, 217, 169, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#F2C5BB";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#BDD9A9";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🛒 Comprar Mangas
        </button>

        {/* Botón Vender: Redirige a Contacto */}
        <Link
          to="/contacto"
          style={{
            backgroundColor: "#A66946",
            color: "#ffffff",
            border: "none",
            padding: "0.8rem 2rem",
            borderRadius: "10px",
            fontSize: "1.05rem",
            fontWeight: "bold",
            textDecoration: "none",
            display: "inline-block",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            boxShadow: "0 4px 12px rgba(166, 105, 70, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#8c5435";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#A66946";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          📦 Vender mis Mangas
        </Link>
      </div>
    </section>
  );
};

export default Bienvenida;
