import { useState } from "react";
import Directorio from "../directorio/Directorio";

// Importación de los íconos desde src/assets/icons
import iconInstagram from "../../assets/icons/instagram-logo.svg";
import iconTikTok from "../../assets/icons/tiktok-logo.svg";
import iconFacebook from "../../assets/icons/facebook-logo.svg";

const Footer = () => {
  const anioActual = new Date().getFullYear();
  const [emailNewsletter, setEmailNewsletter] = useState("");
  const [mensajeNewsletter, setMensajeNewsletter] = useState("");

  const manejarNewsletter = (e) => {
    e.preventDefault();
    if (!emailNewsletter.trim()) return;
    setMensajeNewsletter("¡Gracias por suscribirte al newsletter de Yuuki!");
    setEmailNewsletter("");
    setTimeout(() => setMensajeNewsletter(""), 4000);
  };

  const redesSociales = [
    {
      id: 1,
      nombre: "Facebook",
      icono: iconFacebook,
      url: "https://facebook.com",
    },
    { id: 2, nombre: "TikTok", icono: iconTikTok, url: "https://tiktok.com" },
    {
      id: 3,
      nombre: "Instagram",
      icono: iconInstagram,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer className="w-full mt-auto">
      {/* 1. Tarjetas del equipo (Directorio con 4 personas) */}
      <Directorio />

      {/* 2. Cuerpo institucional completo en Tailwind */}
      <div className="bg-[#2d2623] text-[#F2E8C9] py-12 px-4 border-t-4 border-[#BDD9A9]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-sm">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-[#BDD9A9] text-base font-bold mb-3 tracking-wide">
              Sobre YuukiMangas
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed mb-3">
              Somos tu tienda especializada en mangas, cómics y novelas ligeras.
              Llevamos las mejores historias directo a tu colección con envíos a
              todo el país.
            </p>
            <p className="text-stone-400 text-xs">
              Pasión por la lectura japonesa y el coleccionismo desde 2024.
            </p>
          </div>

          {/* Políticas y Términos */}
          <div>
            <h3 className="text-[#BDD9A9] text-base font-bold mb-3 tracking-wide">
              Políticas y Ayuda
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a
                  href="#terminos"
                  className="hover:text-white transition-colors"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="#privacidad"
                  className="hover:text-white transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#envios"
                  className="hover:text-white transition-colors"
                >
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a
                  href="#preguntas"
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Sucursales y Contacto */}
          <div>
            <h3 className="text-[#BDD9A9] text-base font-bold mb-3 tracking-wide">
              Sucursales & Contacto
            </h3>
            <div className="space-y-2 text-xs text-stone-300">
              <p>
                📍 <strong>Central:</strong> Av. Corrientes 1450, CABA
              </p>
              <p>
                📍 <strong>Sucursal Norte:</strong> Belgrano 230, San Isidro
              </p>
              <p>
                📞 <strong>Teléfono:</strong> +54 (11) 4567-8900
              </p>
              <p>
                ✉️ <strong>Email:</strong> info@yuukimangas.com
              </p>
              <p className="text-stone-400">Lun a Sáb: 10:00 a 20:00 hs</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#BDD9A9] text-base font-bold mb-3 tracking-wide">
              Suscríbete al Newsletter
            </h3>
            <p className="text-stone-300 text-xs mb-3">
              Recibe novedades de lanzamientos semanales, promociones y cupones
              de descuento exclusivos.
            </p>
            <form onSubmit={manejarNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu.correo@ejemplo.com"
                value={emailNewsletter}
                onChange={(e) => setEmailNewsletter(e.target.value)}
                required
                className="w-full px-3 py-2 bg-stone-800 border border-stone-600 rounded text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#BDD9A9]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#A66946] hover:bg-[#8e5737] text-white text-xs font-bold rounded transition-colors"
              >
                Suscribirme
              </button>
            </form>
            {mensajeNewsletter && (
              <p className="text-xs text-[#BDD9A9] mt-2 font-medium">
                {mensajeNewsletter}
              </p>
            )}
          </div>
        </div>

        {/* 3. Redes sociales y derechos reservados */}
        <div className="pt-8 border-t border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-xs text-stone-400">
          <p>© {anioActual} YuukiMangas – Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <span className="text-stone-300 font-semibold">Síguenos:</span>
            {redesSociales.map((red) => (
              <a
                key={red.id}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                title={red.nombre}
                className="p-1.5 bg-stone-800 rounded-full hover:bg-stone-700 transition-colors opacity-85 hover:opacity-100 hover:scale-110 transform transition-transform"
              >
                <img
                  src={red.icono}
                  alt={red.nombre}
                  className="w-4 h-4 filter invert brightness-90"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
