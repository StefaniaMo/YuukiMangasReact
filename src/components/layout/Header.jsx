import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import { useCarrito } from "../../context/CarritoContext";

/**
 * Componente Header (Doble barra horizontal)
 * 1) Barra superior: SVG de Pokébola + botones de Iniciar Sesión / Registro / Panel / Salir.
 * 2) Barra inferior: Logo "YuukiMangas" + links de Inicio, Productos (con dropdown de Géneros),
 *    Cupones, Buscar (desplegable/inline) y Carrito (SVG).
 */
const Header = () => {
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const { itemsEnCarrito } = useCarrito();
  const totalItems = itemsEnCarrito();

  const navigate = useNavigate();
  const location = useLocation();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [dropdownGenero, setDropdownGenero] = useState(false);
  const [generos, setGeneros] = useState([]);

  // Carga las categorías/géneros únicos existentes en Firestore
  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const snap = await getDocs(collection(db, COLECCION_PRODUCTOS));
        const unicos = [
          ...new Set(
            snap.docs
              .map((doc) => doc.data().categoria?.trim())
              .filter(Boolean),
          ),
        ];
        setGeneros(unicos);
      } catch (error) {
        console.error("Error al cargar géneros:", error);
      }
    };
    cargarGeneros();
  }, []);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

  const seleccionarGenero = (genero) => {
    setBusqueda(genero);
    setDropdownGenero(false);
    setMenuAbierto(false);
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* 1. BARRA SUPERIOR: SVG Pokémon (izquierda) + Auth (derecha) */}
      <div className="bg-[#2d2623] text-[#F2E8C9] border-b border-[#A66946]/30">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
          {/* SVG pequeño de Pokébola */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            title="YuukiMangas"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="#ffffff"
                stroke="#1c1917"
                strokeWidth="1.5"
              />
              <path
                d="M2 12a10 10 0 0 1 20 0z"
                fill="#ef4444"
                stroke="#1c1917"
                strokeWidth="1.5"
              />
              <line
                x1="2"
                y1="12"
                x2="22"
                y2="12"
                stroke="#1c1917"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="12"
                r="3.2"
                fill="#ffffff"
                stroke="#1c1917"
                strokeWidth="1.8"
              />
            </svg>
            <span className="text-[13px] text-[#BDD9A9] font-semibold hidden sm:inline">
              Tu tienda otaku de confianza
            </span>
          </Link>

          {/* Botones de Sesión / Admin */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.rol === "admin" && (
                  <Link
                    to="/panel"
                    className="px-2.5 py-0.5 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded transition-colors"
                  >
                    Panel Admin
                  </Link>
                )}
                <span className="text-stone-300 hidden sm:inline">
                  Hola,{" "}
                  <strong>{user.nombre || user.email.split("@")[0]}</strong>
                </span>
                <button
                  onClick={logout}
                  className="text-red-300 hover:text-red-200 font-semibold underline cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-[#BDD9A9] font-semibold transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <span className="text-stone-500">|</span>
                <Link
                  to="/registro"
                  className="px-2.5 py-0.5 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. BARRA INFERIOR: Logo "YuukiMangas" (izquierda) + Navegación (derecha) */}
      <div className="bg-[#F2C5BB] border-b-2 border-[#A66946]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo principal */}
          <Link
            to="/"
            onClick={() => setBusqueda("")}
            className="text-2xl sm:text-3xl font-black text-[#A66946] tracking-tight hover:opacity-90 transition-opacity shrink-0"
          >
            Yuuki<span className="text-[#555555]">Mangas</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              onClick={() => setBusqueda("")}
              className="text-[#A66946] hover:text-[#7d4e32] font-bold text-sm transition-colors"
            >
              Inicio
            </Link>

            {/* Productos con dropdown de Género */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownGenero(true)}
              onMouseLeave={() => setDropdownGenero(false)}
            >
              <Link
                to="/productos"
                onClick={() => setBusqueda("")}
                className="text-[#A66946] hover:text-[#7d4e32] font-bold text-sm flex items-center gap-1 transition-colors py-1"
              >
                <span>Productos</span>
                <span className="text-[10px]">▼</span>
              </Link>

              {dropdownGenero && (
                <div className="absolute left-0 top-full w-48 bg-white border-2 border-[#BDD9A9] rounded-xl shadow-lg py-2 z-50">
                  <button
                    type="button"
                    onClick={() => seleccionarGenero("")}
                    className="w-full text-left px-4 py-1.5 text-xs font-bold text-[#A66946] hover:bg-[#F2E8C9] transition-colors cursor-pointer"
                  >
                    Todos los mangas
                  </button>
                  {generos.length > 0 && (
                    <>
                      <div className="px-4 py-1 text-[10px] font-bold uppercase text-stone-400 border-t border-stone-100 mt-1">
                        Géneros
                      </div>
                      {generos.map((gen) => (
                        <button
                          key={gen}
                          type="button"
                          onClick={() => seleccionarGenero(gen)}
                          className="w-full text-left px-4 py-1.5 text-xs text-stone-700 hover:bg-[#F2E8C9] hover:text-[#A66946] font-medium transition-colors cursor-pointer"
                        >
                          {gen}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/cupones"
              className="text-[#A66946] hover:text-[#7d4e32] font-bold text-sm transition-colors"
            >
              Cupones
            </Link>

            {/* Buscador desplegable */}
            <div className="relative flex items-center">
              {buscadorAbierto ? (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center relative"
                >
                  <input
                    type="text"
                    placeholder="Buscar manga o género..."
                    value={busqueda}
                    onChange={manejarBusqueda}
                    autoFocus
                    className="w-44 lg:w-56 pl-3 pr-7 py-1 bg-white border border-[#A66946]/50 rounded-full text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#A66946]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBusqueda("");
                      setBuscadorAbierto(false);
                    }}
                    className="absolute right-2 text-stone-400 hover:text-stone-700 text-xs font-bold cursor-pointer"
                    title="Cerrar buscador"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setBuscadorAbierto(true)}
                  className="flex items-center gap-1 text-[#A66946] hover:text-[#7d4e32] font-bold text-sm transition-colors cursor-pointer"
                  title="Buscar mangas"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path strokeLinecap="round" d="m21 21-4.3-4.3" />
                  </svg>
                  <span>Buscar</span>
                </button>
              )}
            </div>

            {/* Carrito SVG */}
            <Link
              to="/carrito"
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-white/85 hover:bg-white border border-[#A66946]/30 rounded-full text-[#A66946] font-bold text-sm shadow-sm transition-all"
              title="Ver carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="px-1.5 py-0.2 bg-[#A66946] text-white rounded-full text-[11px] font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Controles Mobile (Carrito + Hamburguesa) */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/carrito"
              className="relative flex items-center gap-1 px-2.5 py-1 bg-white/85 rounded-full text-[#A66946] font-bold text-xs border border-[#A66946]/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>

            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-2xl text-[#A66946] p-1 focus:outline-none"
              aria-label="Alternar menú"
            >
              {menuAbierto ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile desplegable */}
      {menuAbierto && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={cerrarMenu}
          />
          <aside className="fixed top-0 right-0 w-64 h-full bg-[#F2E8C9] border-l-4 border-[#BDD9A9] shadow-2xl p-6 flex flex-col gap-4 z-50 md:hidden overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#A66946]/20">
              <span className="font-bold text-[#A66946] text-lg">Menú</span>
              <button
                onClick={cerrarMenu}
                className="text-stone-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Buscador en mobile */}
            <input
              type="text"
              placeholder="Buscar mangas..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full px-3 py-1.5 bg-white border border-[#A66946]/40 rounded-lg text-xs"
            />

            <Link
              to="/"
              onClick={() => {
                setBusqueda("");
                cerrarMenu();
              }}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              onClick={() => {
                setBusqueda("");
                cerrarMenu();
              }}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Productos
            </Link>
            {generos.length > 0 && (
              <div className="pl-3 flex flex-col gap-1.5 border-l-2 border-[#BDD9A9]">
                <span className="text-[11px] font-bold text-stone-400 uppercase">
                  Géneros
                </span>
                {generos.map((gen) => (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => seleccionarGenero(gen)}
                    className="text-left text-xs text-stone-700 hover:text-[#A66946]"
                  >
                    {gen}
                  </button>
                ))}
              </div>
            )}
            <Link
              to="/cupones"
              onClick={cerrarMenu}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Cupones
            </Link>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
