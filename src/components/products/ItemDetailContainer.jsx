import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, COLECCION_PRODUCTOS } from "../../firebase/config";
import ItemDetail from "./ItemDetail";

/**
 * Componente ItemDetailContainer
 * Consulta un manga en Firestore según su ID recibido por la URL (`useParams`).
 * Si el ID no existe en Firestore, revisa el archivo de respaldo local `datos/productos.json`.
 */
const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;

    const cargarManga = async () => {
      setCargando(true);
      setError(null);

      try {
        // 1. Intentamos buscar el documento en Firestore
        const docRef = doc(db, COLECCION_PRODUCTOS, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (montado) {
            setProducto({ ...docSnap.data(), id: docSnap.id });
            setCargando(false);
          }
          return;
        }

        // 2. Si no está en Firestore por id de Firestore, revisamos en datos/productos.json
        const resLocal = await fetch("datos/productos.json");
        if (resLocal.ok) {
          const listaLocal = await resLocal.json();
          const encontrado = listaLocal.find((p) => String(p.id) === String(id));
          if (encontrado && montado) {
            setProducto(encontrado);
            setCargando(false);
            return;
          }
        }

        if (montado) {
          setProducto(null);
          setCargando(false);
        }
      } catch (err) {
        console.error("Error al obtener manga:", err);
        if (montado) {
          setError("Ocurrió un error al cargar el producto.");
          setCargando(false);
        }
      }
    };

    cargarManga();

    return () => {
      montado = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#BDD9A9] border-t-[#A66946] mb-3"></div>
        <p className="text-[#A66946] font-bold text-lg">
          Cargando detalle del manga...
        </p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="py-16 px-4 text-center max-w-md mx-auto">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
          <p className="text-2xl mb-2">🔍</p>
          <h3 className="text-lg font-bold text-stone-800 mb-2">
            Manga no encontrado
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            El producto solicitado no existe o fue dado de baja del catálogo.
          </p>
          <Link
            to="/productos"
            className="inline-block px-5 py-2.5 bg-[#A66946] hover:bg-[#8e5737] text-white font-bold rounded-lg text-sm shadow transition-colors"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;
