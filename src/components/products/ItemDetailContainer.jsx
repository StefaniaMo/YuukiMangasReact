import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (id.startsWith("kitsu-")) {
      const realId = id.replace("kitsu-", "");
      fetch(`https://kitsu.io/api/edge/manga/${realId}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            const item = data.data;
            setProducto({
              id: `kitsu-${item.id}`,
              nombre: item.attributes.canonicalTitle,
              precio: 9500,
              categoria: item.attributes.subtype || "Manga",
              descripcion: item.attributes.synopsis,
              imagen:
                item.attributes.posterImage?.original ||
                item.attributes.posterImage?.small,
            });
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      fetch("/datos/productos.json")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            const encontrado = data.find((p) => String(p.id) === String(id));
            setProducto(encontrado);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "#A66946",
          fontWeight: "bold",
        }}
      >
        Cargando detalle del manga...
      </p>
    );
  }

  if (!producto) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <p
          style={{ color: "#A66946", fontSize: "1.2rem", marginBottom: "1rem" }}
        >
          Producto no encontrado
        </p>
        <Link to="/productos" style={{ color: "#2d2623", fontWeight: "bold" }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;
