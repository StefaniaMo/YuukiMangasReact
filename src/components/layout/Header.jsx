import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import { useCarrito } from "../../context/CarritoContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const { itemsEnCarrito } = useCarrito();
  const totalItems = itemsEnCarrito();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuAbierto, setMenuAbierto] = useState(false);

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    // Si el usuario escribe y no está en /productos, lo redirigimos automáticamente
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F2C5BB] border-b-2 border-[#A66946] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / Nombre de marca */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-2xl font-black text-[#A66946] tracking-tight hover:opacity-90 transition-opacity"
          >
            Yuuki<span className="text-[#555555]">Mangas</span>
          </Link>

          {/* Navegación Desktop */}
          <div className="hidden md:flex">
            <Nav />
          </div>
        </div>

        {/* Buscador en tiempo real */}
        <form
          className="flex-1 max-w-xs sm:max-w-md relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar mangas..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full pl-3 pr-8 py-1.5 bg-white/90 border border-[#A66946]/40 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#A66946] focus:bg-white transition-all shadow-inner"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Auth + Carrito + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Sección de Autenticación */}
          <div className="hidden lg:flex items-center gap-3 text-sm">
            {user ? (
              <div className="flex items-center gap-2">
                {user.rol === "admin" && (
                  <Link
                    to="/panel"
                    className="px-2.5 py-1 bg-[#A66946] text-white text-xs font-bold rounded-md hover:bg-[#8d5635] transition-colors"
                  >
                    Panel Admin
                  </Link>
                )}
                <span className="text-stone-700 text-xs font-medium">
                  Hola, <strong>{user.nombre || user.email.split("@")[0]}</strong>
                </span>
                <button
                  onClick={logout}
                  className="text-xs text-red-700 hover:text-red-900 underline font-semibold transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-[#A66946] hover:text-[#7d4e32] font-bold text-sm"
                >
                  Ingresar
                </Link>
                <span className="text-stone-400">|</span>
                <Link
                  to="/registro"
                  className="text-stone-600 hover:text-stone-900 text-sm"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botón Carrito */}
          <Link
            to="/carrito"
            className="relative flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white border border-[#A66946]/30 rounded-full text-[#A66946] font-bold text-sm shadow-sm transition-all"
            title="Ver carrito de compras"
          >
            <span>🛒</span>
            <span className="hidden sm:inline text-xs">Carrito</span>
            {totalItems > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-[#A66946] text-white rounded-full text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Botón hamburguesa (Mobile / Tablet) */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden text-2xl text-[#A66946] p-1 focus:outline-none"
            aria-label="Alternar menú"
          >
            {menuAbierto ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menú Mobile desplegable */}
      {menuAbierto && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={cerrarMenu}
          />
          <aside className="fixed top-0 right-0 w-64 h-full bg-[#F2E8C9] border-l-4 border-[#BDD9A9] shadow-2xl p-6 flex flex-col gap-4 z-50 md:hidden">
            <div className="flex justify-between items-center pb-2 border-b border-[#A66946]/20">
              <span className="font-bold text-[#A66946] text-lg">Menú</span>
              <button
                onClick={cerrarMenu}
                className="text-stone-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <Link
              to="/"
              onClick={cerrarMenu}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              onClick={cerrarMenu}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Productos
            </Link>
            <Link
              to="/contacto"
              onClick={cerrarMenu}
              className="text-[#A66946] font-bold hover:text-[#7d4e32]"
            >
              Contacto
            </Link>

            <div className="pt-4 border-t border-[#A66946]/20 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="text-xs text-stone-600">
                    Conectado como: <strong>{user.email}</strong>
                  </div>
                  {user.rol === "admin" && (
                    <Link
                      to="/panel"
                      onClick={cerrarMenu}
                      className="px-3 py-1.5 bg-[#A66946] text-white text-center text-xs font-bold rounded"
                    >
                      Panel de Administración
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      cerrarMenu();
                    }}
                    className="text-left text-xs text-red-600 font-bold"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={cerrarMenu}
                    className="text-sm font-bold text-[#A66946]"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    onClick={cerrarMenu}
                    className="text-sm text-stone-700"
                  >
                    Crear Cuenta
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
