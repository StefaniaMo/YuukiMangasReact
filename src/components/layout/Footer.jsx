import Directorio from "../Directorio/Directorio";

// Importación de los íconos desde src/assets/icons
import iconInstagram from "../../assets/icons/instagram-logo.svg";
import iconTikTok from "../../assets/icons/tiktok-logo.svg";
import iconFacebook from "../../assets/icons/facebook-logo.svg";

const Footer = () => {
  // Lista de redes para mapear fácilmente
  const redesSociales = [
    {
      id: 1,
      nombre: "Facebook",
      icono: iconFacebook,
      url: "https://facebook.com",
    },
    { id: 2, nombre: "Tiktok", icono: iconTikTok, url: "https://tiktok.com" },
    {
      id: 3,
      nombre: "Instagram",
      icono: iconInstagram,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer>
      {/* Directorio del equipo al inicio */}
      <Directorio />

      {/* 2. Sección inferior con los colores de tu marca */}
      <div
        style={{
          backgroundColor: "#2d2623",
          color: "#F2E8C9",
          textAlign: "center",
          padding: "1.5rem 1rem",
        }}
      >
        <p
          style={{
            margin: "0 0 0.5rem 0",
            fontSize: "0.9rem",
            color: "#e2d7c5",
          }}
        >
          © 2026 YuukiMangas - Todos los derechos reservados
        </p>

        <p
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#BDD9A9",
          }}
        >
          Seguinos en nuestras redes
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          {redesSociales.map((red) => (
            <a
              key={red.id}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              title={red.nombre}
              style={{
                display: "inline-block",
                opacity: 0.85,
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <img
                src={red.icono}
                alt={red.nombre}
                style={{
                  width: "26px",
                  height: "26px",
                  objectFit: "contain",
                  /* Si los SVG son negros, esta propiedad los vuelve de color beige/crema */
                  filter: "brightness(0) invert(0.9)",
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
