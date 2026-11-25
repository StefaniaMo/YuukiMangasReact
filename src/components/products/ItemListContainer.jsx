import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../../firebase/config";
import { useSearch } from "../../context/SearchContext";
import ItemList from "./ItemList";
import Paginacion from "../Paginacion";

/**
 * Componente ItemListContainer
 * Conecta con Firestore para obtener la colección de mangas ("mangas").
 * Soporta filtrado en tiempo real mediante SearchContext y paginación en el cliente/catálogo.
 */
const ItemListContainer = ({ limite }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Paginación interna
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 8;

  // Búsqueda en tiempo real desde el Header
  const { busqueda } = useSearch();

  // Guardamos la búsqueda anterior durante el render para ajustar la página sin disparar un effect
  const [busquedaAnterior, setBusquedaAnterior] = useState(busqueda);
  if (busqueda !== busquedaAnterior) {
    setBusquedaAnterior(busqueda);
    setPaginaActual(1);
  }

  // Carga de productos desde Firestore
  useEffect(() => {
    let montado = true;

    const cargarProductosFirestore = async () => {
      setCargando(true);
      try {
        const coleccionRef = collection(db, COLECCION_PRODUCTOS);
        const snapshot = await getDocs(coleccionRef);

        const lista = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (montado) {
          setProductos(lista);
          setError(null);
        }
      } catch (err) {
        console.error("Error al cargar mangas de Firebase:", err);
        if (montado) {
          setError("No se pudieron cargar los productos desde la base de datos.");
        }
      } finally {
        if (montado) setCargando(false);
      }
    };

    cargarProductosFirestore();

    return () => {
      montado = false;
    };
  }, []);

  // Filtrado reactivo en tiempo real
  const productosFiltrados = productos.filter((prod) => {
    const termino = busqueda.toLowerCase().trim();
    const coincideNombre = prod.nombre?.toLowerCase().includes(termino);
    const coincideCategoria = prod.categoria?.toLowerCase().includes(termino);
    return coincideNombre || coincideCategoria;
  });

  // Si se pasa 'limite' (por ejemplo, en la vista de Inicio) recortamos directamente
  const productosParaMostrar = limite
    ? productosFiltrados.slice(0, limite)
    : productosFiltrados;

  // Cálculo de páginas para la vista completa de /productos
  const totalPaginas = Math.max(
    1,
    Math.ceil(productosParaMostrar.length / elementosPorPagina)
  );

  const inicio = (paginaActual - 1) * elementosPorPagina;
  const productosPaginados = limite
    ? productosParaMostrar
    : productosParaMostrar.slice(inicio, inicio + elementosPorPagina);

  // Estado: Cargando
  if (cargando) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#BDD9A9] border-t-[#A66946] mb-3"></div>
        <p className="text-[#A66946] font-bold text-lg">
          Cargando catálogo de mangas desde Firebase...
        </p>
      </div>
    );
  }

  // Estado: Error
  if (error) {
    return (
      <div className="my-8 p-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl max-w-xl mx-auto text-center">
        <p className="font-bold text-lg mb-1">⚠️ Error al conectar con Firestore</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section id="catalogo-mangas" className="py-6">
      {/* Título de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 mb-6 border-b-2 border-[#BDD9A9]">
        <h2 className="text-2xl sm:text-3xl font-black text-[#A66946]">
          {limite ? "🔥 Mangas Destacados" : "📚 Catálogo Completo de Mangas"}
        </h2>
        {busqueda && (
          <span className="text-xs sm:text-sm text-stone-500 mt-1 sm:mt-0">
            Filtrando por: <strong>"{busqueda}"</strong> ({productosFiltrados.length}{" "}
            resultados)
          </span>
        )}
      </div>

      {/* Si no hay coincidencias */}
      {productosFiltrados.length === 0 ? (
        <div className="py-12 px-6 bg-stone-50 border border-stone-200 rounded-2xl text-center max-w-lg mx-auto">
          <p className="text-lg font-bold text-stone-700 mb-2">
            No se encontraron mangas
          </p>
          <p className="text-sm text-stone-500 mb-4">
            No hay productos que coincidan con "{busqueda}". Prueba con otro título
            o categoría.
          </p>
        </div>
      ) : (
        <>
          {/* Renderizado de la lista de mangas */}
          <ItemList productos={productosPaginados} />

          {/* Paginador (solo cuando no hay límite y hay más de 1 página) */}
          {!limite && totalPaginas > 1 && (
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              alCambiarPagina={(pag) => setPaginaActual(pag)}
            />
          )}

          {/* Botón 'Ver todo' para la página de inicio */}
          {limite && productos.length > limite && (
            <div className="text-center mt-10">
              <Link
                to="/productos"
                className="inline-block px-8 py-3 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Ver todo el catálogo ({productos.length} mangas) →
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ItemListContainer;
