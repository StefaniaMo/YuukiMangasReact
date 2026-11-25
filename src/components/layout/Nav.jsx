import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center gap-6" aria-label="Navegación principal">
      <Link
        to="/"
        className="text-[#A66946] hover:text-[#7d4e32] font-semibold text-base transition-colors"
      >
        Inicio
      </Link>
      <Link
        to="/productos"
        className="text-[#A66946] hover:text-[#7d4e32] font-semibold text-base transition-colors"
      >
        Productos
      </Link>
      <Link
        to="/contacto"
        className="text-[#A66946] hover:text-[#7d4e32] font-semibold text-base transition-colors"
      >
        Contacto
      </Link>
    </nav>
  );
};

export default Nav;
