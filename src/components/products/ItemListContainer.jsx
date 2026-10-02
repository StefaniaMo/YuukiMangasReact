import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";

const ItemListContainer = ({ limite }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLocal = fetch("datos/productos.json").then((res) => res.json());
    const fetchKitsu = fetch("https://kitsu.io/api/edge/manga?page[limit]=10")
      .then((res) => res.json())
      .then((data) => {
        return data.data.map((item) => ({
          id: `kitsu-${item.id}`,
          nombre: item.attributes.canonicalTitle,
          precio: Math.floor(Math.random() * 5000) + 8000,
          categoria: item.attributes.subtype || "Manga",
          descripcion: item.attributes.synopsis,
          imagen:
            item.attributes.posterImage?.small ||
            item.attributes.posterImage?.original,
        }));
      });

    Promise.all([fetchLocal, fetchKitsu])
      .then(([dataLocal, dataKitsu]) => {
        if (isMounted) {
          setProductos([...dataLocal, ...dataKitsu]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error cargando los productos:", error);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem 0",
          color: "#A66946",
          fontWeight: "bold",
        }}
      >
        Cargando catálogo de mangas...
      </div>
    );
  }

  // Si pasamos la prop 'limite', recortamos el listado a esa cantidad
  const productosAMostrar = limite ? productos.slice(0, limite) : productos;

  return (
    <section id="catalogo-mangas" style={{ padding: "1rem 0" }}>
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          marginBottom: "1.5rem",
          color: "#A66946",
          borderBottom: "2px solid #BDD9A9",
          paddingBottom: "0.5rem",
        }}
      >
        {limite ? "Mangas Destacados" : "Todos nuestros Mangas"}
      </h2>

      <ItemList productos={productosAMostrar} />

      {/* Si hay límite (Pantalla de Inicio), mostramos el enlace "Ver todo" */}
      {limite && (
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            to="/productos"
            style={{
              display: "inline-block",
              backgroundColor: "#A66946",
              color: "#FFFFFF",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "1.05rem",
              boxShadow: "0 4px 6px rgba(166, 105, 70, 0.2)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
          >
            Ver todos los productos →
          </Link>
        </div>
      )}
    </section>
  );
};

export default ItemListContainer;
