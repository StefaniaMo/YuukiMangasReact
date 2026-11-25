import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";

/**
 * Hook personalizado para manejar paginación directa con Firestore
 * @param {Object} config - Configuración de Firestore y colección
 */
export const usePaginacion = ({
  db,
  nombreColeccion,
  tamanoPagina = 8,
  campoOrden = "nombre",
  direccionOrden = "asc",
}) => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Registro del último documento de cada página para el cursor startAfter
  const [ultimosDocs, setUltimosDocs] = useState({});
  const [recargarContador, setRecargarContador] = useState(0);

  // Limpia caché de cursores y recarga
  const recargar = () => {
    setUltimosDocs({});
    setRecargarContador((prev) => prev + 1);
  };

  // 1. Calcula el total de páginas basado en el conteo del servidor
  useEffect(() => {
    const calcularTotal = async () => {
      try {
        const colRef = collection(db, nombreColeccion);
        const snapshot = await getCountFromServer(colRef);
        const total = snapshot.data().count;
        const pags = Math.max(1, Math.ceil(total / tamanoPagina));
        setTotalPaginas(pags);

        if (paginaActual > pags) {
          setPaginaActual(pags);
        }
      } catch (err) {
        console.error("Error al calcular total de páginas:", err);
      }
    };

    calcularTotal();
  }, [db, nombreColeccion, tamanoPagina, recargarContador, paginaActual]);

  // 2. Carga los documentos de la página activa
  useEffect(() => {
    const obtenerPagina = async () => {
      setCargando(true);
      try {
        const colRef = collection(db, nombreColeccion);
        let q;

        if (paginaActual === 1) {
          // Primera página: desde el inicio
          q = query(colRef, orderBy(campoOrden, direccionOrden), limit(tamanoPagina));
        } else {
          // Páginas posteriores: buscar cursor anterior
          let cursor = ultimosDocs[paginaActual - 1];

          if (!cursor) {
            let tempCursor = null;
            for (let i = 1; i < paginaActual; i++) {
              const pasoQ = tempCursor
                ? query(
                    colRef,
                    orderBy(campoOrden, direccionOrden),
                    startAfter(tempCursor),
                    limit(tamanoPagina)
                  )
                : query(colRef, orderBy(campoOrden, direccionOrden), limit(tamanoPagina));
              const snap = await getDocs(pasoQ);
              tempCursor = snap.docs[snap.docs.length - 1];
            }
            cursor = tempCursor;
          }

          q = query(
            colRef,
            orderBy(campoOrden, direccionOrden),
            startAfter(cursor),
            limit(tamanoPagina)
          );
        }

        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setElementos(lista);

        if (snapshot.docs.length > 0) {
          const ultimoDoc = snapshot.docs[snapshot.docs.length - 1];
          setUltimosDocs((prev) => ({
            ...prev,
            [paginaActual]: ultimoDoc,
          }));
        }
      } catch (err) {
        console.error("Error al obtener página de Firestore:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerPagina();
  }, [
    db,
    nombreColeccion,
    paginaActual,
    tamanoPagina,
    campoOrden,
    direccionOrden,
    recargarContador,
  ]);

  const irAPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) setPaginaActual(num);
  };

  const paginaSiguiente = () => irAPagina(paginaActual + 1);
  const paginaAnterior = () => irAPagina(paginaActual - 1);

  return {
    elementos,
    setElementos,
    paginaActual,
    totalPaginas,
    cargando,
    irAPagina,
    paginaSiguiente,
    paginaAnterior,
    recargar,
  };
};
