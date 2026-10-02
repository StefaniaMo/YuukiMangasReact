import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Bienvenida from "./components/Bienvenida";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";

const Carrito = () => (
  <h2 style={{ padding: "2rem 0", color: "#A66946" }}>Tu Carrito de Compras</h2>
);
const Contacto = () => (
  <h2 style={{ padding: "2rem 0", color: "#A66946" }}>Página de Contacto</h2>
);

function App() {
  return (
    <Layout>
      <Routes>
        {/* Ruta Inicio: muestra solo 8 mangas y el botón "Ver todo" */}
        <Route
          path="/"
          element={
            <>
              <Bienvenida />
              <ItemListContainer limite={8} />
            </>
          }
        />

        {/* Ruta Productos: muestra todo el catálogo completo sin límite */}
        <Route path="/productos" element={<ItemListContainer />} />

        {/* Detalle del producto */}
        <Route path="/producto/:id" element={<ItemDetailContainer />} />

        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Layout>
  );
}

export default App;
