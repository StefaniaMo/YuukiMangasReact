const TarjetaContacto = ({ persona }) => {
  const { nombre, puesto, email, foto } = persona;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "2px solid #BDD9A9",
        borderRadius: "12px",
        padding: "1.5rem",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.8rem",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <img
        src={foto}
        alt={nombre}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #A66946",
        }}
        // Imagen por defecto si no encuentra la foto local
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/90?text=Perfil";
        }}
      />

      <div>
        <h4
          style={{
            margin: "0 0 0.3rem 0",
            color: "#2d2623",
            fontSize: "1.1rem",
          }}
        >
          {nombre}
        </h4>

        <span
          style={{
            backgroundColor: "#F2C5BB",
            color: "#A66946",
            padding: "0.2rem 0.6rem",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            display: "inline-block",
            marginBottom: "0.5rem",
          }}
        >
          {puesto}
        </span>

        <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
          ✉️{" "}
          <a
            href={`mailto:${email}`}
            style={{ color: "#A66946", textDecoration: "none" }}
          >
            {email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default TarjetaContacto;
