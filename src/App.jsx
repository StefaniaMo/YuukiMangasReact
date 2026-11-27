import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Bienvenida from "./components/Bienvenida";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";
import Publicar from "./components/vender/Publicar";
import Carrito from "./pages/Carrito";
import Cupon from "./components/Cupon";

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
        {/* Ruta para publicar/vender mangas */}
        <Route path="/vender" element={<Publicar />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/cupones" element={<Cupon />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Layout>
  );
}

export default App;
